import React from 'react';
import './Home.css'; // Import the CSS file for styling

export default function Home() {
  return (
    <div className="home-container">
      <header className="hero-section">
        <h1>Welcome to the Online Library</h1>
        <p>Your gateway to a world of knowledge.</p>
      </header>
      <section className="content-section">
        <h2>About Us</h2>
        <p>
          Our online library offers a vast collection of books, articles, and
          research papers across various genres and subjects. Whether you're a
          student, researcher, or simply a book lover, you'll find something of
          interest here.
        </p>
      </section>
      <section className="features-section">
        <h2>Features</h2>
        <ul>
          <li>Extensive Collection of Books</li>
          <li>Easy-to-Use Search Functionality</li>
          <li>Personalized Recommendations</li>
          <li>Accessible Anywhere, Anytime</li>
        </ul>
      </section>
    </div>
  );
}

