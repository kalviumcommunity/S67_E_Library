import { useNavigate } from "react-router-dom";
import "./Landing.css";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="LandingPage">
      <header className="LandingPage-header">
        <h1>Welcome to E-Bookit</h1>
        <p>Your go-to platform for reading and discovering e-books</p>
      </header>

      <section className="about">
        <h2>What is E-Bookit?</h2>
        <p>
          E-Bookit is an innovative platform designed to provide readers with access to a wide range of e-books. 
          Whether you are an avid reader or just getting started, we offer an easy and enjoyable reading experience.
        </p>
      </section>

      <section className="features">
        <h2>Key Features</h2>
        <ul>
          <li>Access to thousands of e-books in various genres</li>
          <li>Easy-to-use reading interface</li>
          <li>Bookmark and highlight your favorite passages</li>
          <li>Offline reading capability</li>
          <li>Personalized recommendations</li>
        </ul>
      </section>

      <section className="call-to-action">
        <h2>Get Started with E-Bookit</h2>
        <button onClick={() => navigate("/books")}>Explore E-Books</button>
      </section>

      <footer className="LandingPage-footer">
        <p>&copy; 2025 E-Bookit. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Landing;
