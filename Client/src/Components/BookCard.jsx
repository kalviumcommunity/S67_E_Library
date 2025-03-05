import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';  // Importing axios for API request

// BookCard Component (Individual Book Display)
const BookCard = ({ title, author, genre, coverImage }) => (
  <div className="max-w-xs rounded-lg overflow-hidden shadow-md bg-white">
    <img src={coverImage} alt={`Cover of ${title}`} className="w-full h-48 object-cover" />
    <div className="p-4">
      <h3 className="text-xl font-bold">{title}</h3>
      <p className="text-gray-700">By {author}</p>
      <p className="text-sm text-gray-500">Genre: {genre}</p>
    </div>
  </div>
);

// BookList Component (Fetching and Displaying a List of Books)
const BookList = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetching books from backend API
  useEffect(() => {
    axios
      .get('http://localhost:5000/api/all')  // Use GET for fetching the data
      .then((response) => {
        setBooks(response.data);  // Assuming the API returns an array of books
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching books:', error);
        setError('Failed to load books');
        setLoading(false);
      });
  }, []);

  // Loading or Error State
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="flex flex-wrap gap-4 p-4">
      {books.map((book) => (
        <BookCard
          key={book.id}
          title={book.title}
          author={book.author}
          genre={book.genre || 'Fiction'}  // Default to 'Fiction' if genre is missing
          coverImage={book.coverImage || 'https://via.placeholder.com/150'}  // Default placeholder image
        />
      ))}
    </div>
  );
};

// PropTypes for validation (BookCard)
BookCard.propTypes = {
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  genre: PropTypes.string,
  coverImage: PropTypes.string,
};

// Exporting the BookList as default
export default BookList;
