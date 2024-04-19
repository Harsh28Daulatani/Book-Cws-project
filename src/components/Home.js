// Home.js
import React from 'react';
import './Home.css';

import img2 from './img2.jpg';
function Home() {
  return (
    <div className="home">
      <div className="container">
        <div className="content">
          <h1>Welcome to Book Store</h1>
          <h3>Find your favorite books and have them delivered to your doorstep!</h3>
          <section className="features">
        <center><div>
        <img src={img2} alt="img2" />
        
        </div></center>
      </section>
          
        </div>
      </div>
    </div>
  );
}

export default Home;
