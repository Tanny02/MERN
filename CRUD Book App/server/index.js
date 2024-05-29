require("dotenv").config();

const cors = require("cors");
const express = require("express");
const connectDB = require("./connectDB");
const Book = require("./models/Book");
const multer = require("multer");

const app = express();
const PORT = process.env.PORT || 8000;
connectDB();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/uploads", express.static("uploads"));

app.get("/", (req, res) => {
  res.json("Hello, world!");
});

app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

app.post("/api/books", upload.single("thumbnail"), async (req, res) => {
  try {
    const { title, slug, description, stars, category } = req.body;
    const thumbnail = req.file.filename;
    const newBook = new Book({
      title: title,
      slug: slug,
      description: description,
      stars: stars,
      category: category,
      thumbnail: thumbnail,
    });
    await newBook.save();
    res.status(201).json({ message: "Book created successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

app.get("/api/books", async (req, res) => {
  try {
    const category = req.query.category;
    const filter = {};
    if (category) {
      filter.category = category;
    }
    const books = await Book.find(filter);
    res.status(200).json(books);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

app.get("/api/books/:slug", async (req, res) => {
  try {
    const slugParam = req.params.slug;
    const book = await Book.find({ slug: slugParam });
    res.status(200).json(book);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

app.put("/api/books/:slug", upload.single("thumbnail"), async (req, res) => {
  try {
    const { title, slug, description, stars, category } = req.body;
    const thumbnail = req.file.filename;
    const updateBook = {
      title: title,
      slug: slug,
      description: description,
      stars: stars,
      category: category,
      thumbnail: thumbnail,
    };
    await Book.findByIdAndUpdate(req.body._id, updateBook);
    res.status(200).json({ message: "Book updated successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

app.delete("/api/books/:slug", async (req, res) => {
  try {
    const slugParam = req.params.slug;
    await Book.deleteOne({ slug: slugParam });
    res.status(200).json({ message: "Book deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});
