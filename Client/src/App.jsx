import React from "react";
import { Routes, Route } from "react-router-dom";
import Landing from "./Components/Landing";
import BookCard from "./Components/BookCard";


const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route
        path="/book"
        element={
          <BookCard
            title="The Great Gatsby"
            author="F. Scott Fitzgerald"
            genre="Classic"
            coverImage="https://d28hgpri8am2if.cloudfront.net/book_images/onix/cvr9781524879761/the-great-gatsby-9781524879761_hr.jpg"
          />
        }
      />
    </Routes>
  );
};

export default App;
