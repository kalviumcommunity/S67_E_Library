  import { useEffect, useState } from "react";
  import { useNavigate } from "react-router-dom";
  import axios from "axios";
  import BookCard from "./BookCard";

  const BookList = () => {
    const [books, setBooks] = useState([]);
    const navigate = useNavigate();

    const fetchBooks = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/all");
        setBooks(response.data); // ✅ Overwrite books, do NOT append
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };
    useEffect(() => {
      fetchBooks();
    }, []);
    
    useEffect(() => {
      console.log("Updated books:", books); // 🔍 Debugging line
    }, [books]);
    

    return (
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">Available E-Books</h2>
        <button
          onClick={() => navigate("/add-book")}
          className="mb-4 bg-green-500 text-white px-4 py-2 rounded"
        >
          Add New Book
        </button>
        <div className="flex flex-wrap gap-4">
          {books.map((book) => (
            <BookCard key={book._id} {...book} />
          ))}
        </div>
      </div>
    );
  };

  export default BookList;
