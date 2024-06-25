import { useContext, useState } from "react";
import axios from "axios";
import { UserContext } from "./UserContext";

const Register = () => {
  const [formData, setFormData] = useState({});
  const [registered, setRegistered] = useState(false);
  const { setUsername, setId } = useContext(UserContext);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = registered ? "login" : "register";
    const { data } = await axios.post(`api/user/${url}`, formData);
    setUsername(data.username);
    setId(data._id);
  };

  return (
    <div className="bg-blue-50 h-screen flex items-center">
      <form className="w-64 mx-auto mb-10" onSubmit={handleSubmit}>
        <input
          type="text"
          id="username"
          placeholder="username"
          className="block w-full rounded-md p-2 mb-2 border"
          onChange={handleChange}
        />
        <input
          type="password"
          id="password"
          placeholder="password"
          className="block w-full rounded-md p-2 mb-2 border"
          onChange={handleChange}
        />
        <button className="bg-blue-500 text-white block w-full rounded-md p-2">
          {registered ? "Login" : "Register"}
        </button>
        {registered ? (
          <p className="text-center">
            Dont have an account?{" "}
            <span
              className="text-blue-500 cursor-pointer"
              onClick={() => setRegistered(false)}
            >
              Register
            </span>
          </p>
        ) : (
          <p className="text-center">
            Already have an account?{" "}
            <span
              className="text-blue-500 cursor-pointer"
              onClick={() => setRegistered(true)}
            >
              Login
            </span>
          </p>
        )}
      </form>
    </div>
  );
};

export default Register;
