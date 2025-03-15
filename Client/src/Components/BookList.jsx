import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const BookList = () => {
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();

  const fetchBooks = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/all");
      setBooks(response.data);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  // Handle Delete Book
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/delete/${id}`);
      fetchBooks(); // Refresh book list after deletion
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Available E-Books</h2>
      <button onClick={() => navigate("/add-book")} className="mb-4 bg-green-500 text-white px-4 py-2 rounded">
        Add New Book
      </button>
      <div className="flex flex-wrap gap-4">
        {books.map((book) => (
          <div key={book._id} className="max-w-xs rounded-lg overflow-hidden shadow-md bg-white p-4">
            <img src={book.coverImage} alt={`Cover of ${book.title}`} className="w-full h-48 object-cover" />
            <h3 className="text-xl font-bold mt-2">{book.title}</h3>
            <p className="text-gray-700">By {book.author}</p>
            <p className="text-sm text-gray-500">Genre: {book.genre}</p>
            <div className="flex gap-2 mt-2">
              <button onClick={() => navigate(`/update-book/${book._id}`)} className="bg-yellow-500 text-white px-3 py-1 rounded">
                Edit
              </button>
              <button onClick={() => handleDelete(book._id)} className="bg-red-500 text-white px-3 py-1 rounded">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookList;
