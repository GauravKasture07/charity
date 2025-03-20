import React from 'react';
import './Home.css';
import missionImage from '../Images/Heroimage.jpg';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import About from './About';
import Footer from './Footer';
import Contact from './Contact';
function Home() {
  return (
    <div className="Home">
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <div className="slogan">
              <h1>Our Helping to<br /> The world.</h1>
              <p>Making a difference in the lives of those who need it the most.</p>
              <Link to="/charity"><Button variant="success">Donate</Button></Link> {/* Correct Link usage */}
            </div>
          </div>
          <div className="col-md-6">
            <div className="image-container">
              <img src={missionImage} alt="Mission" className="img-fluid rounded" />
            </div>
          </div>
        </div>
      </div>
      <About />
      <Contact/>
      <Footer />
    </div>
  );
}

export default Home;
