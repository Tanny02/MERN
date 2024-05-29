import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Books = () => {
  const baseUrl = "http://localhost:8000/api/books";

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selected, setSelected] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        let url = baseUrl;
        if (selected !== "all") {
          url += `?category=${selected}`;
        }
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        const jsonData = await response.json();
        setData(jsonData);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error);
        setError("Error fetching data. Please try again later");
      }
    };
    fetchData();
  }, [selected]);

  return (
    <div>
      <h2>Books</h2>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe tempore
        rerum quidem sunt dolores nulla placeat adipisci ut maxime facere sequi
        error ipsa assumenda vero, at obcaecati, ducimus laudantium quos!
      </p>

      <h3>Fetch Example</h3>

      <div className="filters">
        <label>Categories</label>

        <select onChange={(e) => setSelected(e.target.value)}>
          <option value="all">All</option>
          <option value="romance">Romance</option>
          <option value="fiction">Fiction</option>
          <option value="science">Science</option>
          <option value="thriller">Thriller</option>
          <option value="adventure">Adventure</option>
          <option value="food">Food</option>
          <option value="crime">Crime</option>
          <option value="other">Other</option>
        </select>
      </div>

      {loading ? (
        <div>
          <h3>Loading...</h3>
        </div>
      ) : error ? (
        <div>
          <h3>{error}</h3>
        </div>
      ) : (
        <ul className="books">
          {data.map((item) => (
            <li key={item._id}>
              <Link to={`/books/${item.slug}`}>
                <img
                  src={`http://localhost:8000/uploads/${item.thumbnail}`}
                  alt={item.title}
                />
                <h3>{item.title}</h3>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Books;
