// src/LandingPage.jsx
import React from 'react';
import './Landing.css';

const Landing = () => {
  return (
    <div className="LandingPage">
      {/* Header Section */}
      <header className="LandingPage-header">
        <h1>Welcome to E-Bookit</h1>
        <p>Your go-to platform for reading and discovering e-books</p>
      </header>

      {/* About Section */}
      <section className="about">
        <h2>What is E-Bookit?</h2>
        <p>
          E-Bookit is an innovative platform designed to provide readers with access to a wide range of e-books. 
          Whether you're an avid reader or just getting started, we offer an easy and enjoyable reading experience.
        </p>
      </section>

      {/* Features Section */}
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

      {/* Call-to-Action Section */}
      <section className="call-to-action">
        <h2>Get Started with E-Bookit</h2>
        <button onClick={() => alert('Redirecting to signup...')}>
          Sign Up Now
        </button>
        <p>or</p>
        <button onClick={() => alert('Redirecting to explore e-books...')}>
          Explore E-Books
        </button>
      </section>

      {/* Footer Section */}
      <footer className="LandingPage-footer">
        <p>&copy; 2025 E-Bookit. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Landing;
