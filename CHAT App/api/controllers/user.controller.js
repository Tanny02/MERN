import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const getPeople = async (req, res) => {
  const users = await User.find({}, { _id: 1, username: 1 });
  res.json(users);
};

export const profile = async (req, res) => {
  const token = req.cookies?.token;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, {}, (err, user) => {
      if (err) throw err;
      res.json(user);
    });
  } else {
    res.status(401).json("no token");
  }
};

export const register = async (req, res) => {
  const { username, password } = req.body;

  try {
    const hashPass = bcrypt.hashSync(password, 10);
    const user = new User({
      username,
      password: hashPass,
    });
    await user.save();
    jwt.sign(
      { id: user._id, username },
      process.env.JWT_SECRET,
      {},
      (err, token) => {
        res
          .cookie("token", token, { sameSite: "none", secure: true })
          .status(201)
          .json(user);
      }
    );
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) return res.status(404).json({ message: "User not found" });
  const validPassword = bcrypt.compareSync(password, user.password);
  if (!validPassword)
    return res.status(403).json({ message: "Password is incorrect" });
  jwt.sign(
    { id: user._id, username },
    process.env.JWT_SECRET,
    {},
    (err, token) => {
      res
        .cookie("token", token, { sameSite: "none", secure: true })
        .status(200)
        .json(user);
    }
  );
};

export const logout = async (req, res) => {
  res
    .cookie("token", "", { sameSite: "none", secure: true })
    .status(200)
    .json({ message: "Logged out" });
};
