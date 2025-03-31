import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import instance from "../axiosInstance.js";

const UpdateBook = () => {
  const { id } = useParams(); // Get book ID from URL
  const navigate = useNavigate();

  const [book, setBook] = useState({
    title: "",
    author: "",
    genre: "",
    coverImage: "",
  });

  // Fetch existing book data
  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await instance.get(`http://localhost:5000/api/all/${id}`);
        setBook(response.data);
      } catch (error) {
        console.error("Error fetching book:", error);
      }
    };

    fetchBook();
  }, [id]);

  // Handle input change
  const handleChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  // Handle form submission (Update book)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await instance.put(`http://localhost:5000/api/change/${id}`, book);
      navigate("/books"); // Redirect to book list after update
    } catch (error) {
      console.error("Error updating book:", error);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Update Book</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={book.title}
          onChange={handleChange}
          required
          className="border p-2 rounded"
        />
        <input
          type="text"
          name="author"
          placeholder="Author"
          value={book.author}
          onChange={handleChange}
          required
          className="border p-2 rounded"
        />
        <input
          type="text"
          name="genre"
          placeholder="Genre"
          value={book.genre}
          onChange={handleChange}
          required
          className="border p-2 rounded"
        />
        <input
          type="text"
          name="coverImage"
          placeholder="Cover Image URL"
          value={book.coverImage}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700">
          Update Book
        </button>
      </form>
    </div>
  );
};

export default UpdateBook;
