import React, { useEffect, useState } from 'react';
import BookCard from './BookCard';


const BookList = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetching books from backend API
  useEffect(() => {
    fetch('http://localhost:5000/api/all') // Your backend API URL here
      .then(response => response.json())
      .then(data => {
        setBooks(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching books:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-wrap gap-4">
      {books.map(book => (
        <BookCard
          key={book.id}
          title={book.title}
          author={book.author}  
          genre="Fiction"           
          coverImage="https://via.placeholder.com/150"  
        />
      ))}
    </div>
  );
};

export default BookList;
