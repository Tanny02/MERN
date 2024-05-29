import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const Edit = () => {
  const urlSlug = useParams();
  const baseUrl = `http://localhost:8000/api/books/${urlSlug.slug}`;
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [stars, setStars] = useState(0);
  const [categories, setCategories] = useState([]);
  const [thumbnail, setThumbnail] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [image, setImage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(baseUrl);
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        const data = await response.json();
        data.map((content) => {
          setTitle(content.title);
          setSlug(content.slug);
          setDescription(content.description);
          setStars(content.stars);
          setCategories(content.category);
          setThumbnail(content.thumbnail);
        });
      } catch (error) {
        console.log(error);
        alert(error);
      }
    };
    fetchData();
  }, []);

  const editBook = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("slug", slug);
    formData.append("description", description);
    formData.append("stars", stars);
    formData.append("category", categories);
    formData.append("thumbnail", thumbnail);
    try {
      const response = await fetch("http://localhost:8000/api/books/:slug", {
        method: "PUT",
        body: formData,
      });
      if (response.ok) {
        setSubmitted(true);
        alert("Book edited successfully");
        window.location = "/books";
      } else {
        throw new Error(response.statusText);
      }
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(URL.createObjectURL(e.target.files[0]));
      setThumbnail(e.target.files[0]);
    }
  };

  const handleCategoriesChange = (e) => {
    setCategories(e.target.value.split(",").map((category) => category.trim()));
  };

  return (
    <div>
      <h1>Edit Book</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo maiores
        recusandae commodi, vel consequatur repellat unde obcaecati hic, eum
        incidunt, dolorem dignissimos dolores delectus ad similique cupiditate
        aliquam! Recusandae, nam.
      </p>
      {submitted ? (
        <h1>Book edited successfully</h1>
      ) : (
        <form className="bookdetails" onSubmit={editBook}>
          <div className="col-1">
            <label>Upload Thumbnail</label>
            {image ? (
              <img src={`${image}`} alt="preview image" />
            ) : (
              <img
                src={`http://localhost:8000/uploads/${thumbnail}`}
                alt="preview image"
              />
            )}
            <input
              type="file"
              accept="image/gif, image/jpeg, image/png"
              onChange={handleImageChange}
            />
          </div>
          <div className="col-2">
            <div>
              <label>Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div>
              <label>Slug</label>
              <input
                type="text"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
              />
            </div>
            <div>
              <label>Description</label>
              <textarea
                rows="4"
                cols="50"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>
            <div>
              <label>Rating</label>
              <input
                type="text"
                value={stars}
                onChange={(e) => setStars(e.target.value)}
              />
            </div>
            <div>
              <label>Category(comma-seperated)</label>
              <input
                type="text"
                value={categories}
                onChange={handleCategoriesChange}
              />
            </div>
            <input type="submit" value="Update Book" />
          </div>
        </form>
      )}
    </div>
  );
};

export default Edit;
