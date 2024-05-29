import React, { useState } from "react";
import NoImageSelected from "../../assets/no-image-selected.jpg";

const Create = () => {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [stars, setStars] = useState(0);
  const [categories, setCategories] = useState([]);
  const [thumbnail, setThumbnail] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [image, setImage] = useState(NoImageSelected);

  const createBook = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("slug", slug);
    formData.append("description", description);
    formData.append("stars", stars);
    formData.append("category", categories);
    formData.append("thumbnail", thumbnail);
    try {
      const response = await fetch("http://localhost:8000/api/books", {
        method: "POST",
        body: formData,
      });
      if (response.ok) {
        setSubmitted(true);
        alert("Book created successfully");
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
      <h1>Create Book</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo maiores
        recusandae commodi, vel consequatur repellat unde obcaecati hic, eum
        incidunt, dolorem dignissimos dolores delectus ad similique cupiditate
        aliquam! Recusandae, nam.
      </p>
      {submitted ? (
        <h1>Data submitted successfully</h1>
      ) : (
        <form className="bookdetails" onSubmit={createBook}>
          <div className="col-1">
            <label>Upload Thumbnail</label>
            <img src={image} alt="previw image" />
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
            <input type="submit" value="Create Book" />
          </div>
        </form>
      )}
    </div>
  );
};

export default Create;
