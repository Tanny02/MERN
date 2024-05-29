import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

const SingleBook = () => {
  const [data, setData] = useState([]);
  const { slug } = useParams();
  const baseUrl = `http://localhost:8000/api/books/${slug}`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(baseUrl);
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [slug]);

  const StarRating = ({ numberOfStars }) => {
    const stars = [];
    for (let i = 0; i < numberOfStars; i++) {
      stars.push(<span key={i}>⭐</span>);
    }
    return <div>Rating: {stars}</div>;
  };

  const deleteBook = async () => {
    const response = await fetch(baseUrl, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    window.location = "/books";
  };

  if (!data.length) {
    return <h1>Loading...</h1>;
  }

  return (
    <div>
      {data.map((element) => (
        <div className="bookdetails">
          <div className="col-1">
            <img
              src={`http://localhost:8000/uploads/${element.thumbnail}`}
              alt={element.title}
            />
            <br />
            <Link to={`/editbook/${element.slug}`}>Edit✏️</Link>
            <button className="delete" onClick={deleteBook}>
              Delete
            </button>
          </div>
          <div className="col-2">
            <h1>{element.title}</h1>
            <p>{element.description}</p>
            <StarRating numberOfStars={element.stars} />
            <p>Category</p>
            <ul>
              {element.category.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      ))}
      <Link to="/books">Back to Books</Link>
    </div>
  );
};

export default SingleBook;
