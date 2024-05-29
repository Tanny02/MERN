import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./routes/Home/home";
import About from "./routes/About/about";
import Books from "./routes/Books/books";
import Header from "./components/Header";
import Footer from "./components/Footer";
import SingleBook from "./routes/Books/singleBook";
import Create from "./routes/Books/create";
import Edit from "./routes/Books/edit";

function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/books" element={<Books />} />
          <Route path="/about" element={<About />} />
          <Route path="/books/:slug" element={<SingleBook />} />
          <Route path="/createbook" element={<Create />} />
          <Route path="/editbook/:slug" element={<Edit />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
