import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./Components/Landing";
import BookList from "./Components/BookList";
import AddBook from "./Components/AddBook";
import UpdateBook from "./Components/UpdateBook";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/books" element={<BookList/>} />
        <Route path="/add-book" element={<AddBook />} />
        <Route path="/update-book/:id" element={<UpdateBook/>} />
      </Routes>
    </Router>
  );
};

export default App;
