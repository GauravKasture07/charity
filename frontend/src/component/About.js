import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import './About.css';
import Drink from '../Images/DrinkWater.jpg';
import Education from '../Images/Education.jpg';
import Health from '../Images/Health.jpg';
import Member1 from '../Images/Health.jpg';
import Member2 from '../Images/Health.jpg';
import Member3 from '../Images/Health.jpg';
import Member4 from '../Images/Health.jpg';
import Member5 from '../Images/Health.jpg';

function About() {
  return (
    <div className="About">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xl-6 col-lg-7 col-md-10 col-sm-10">
            <div className="section-tittle text-center mb-80">
              <h1 className='fadeInText'>About Us</h1>
              <br></br>
              <span style={{ color: 'green' }}>What we are doing</span>
              <h2>We Are In A Mission To Help The Helpless</h2>
            </div>
          </div>
        </div>

        <div className="about-us">
          <h2>MISSION</h2>
          <p>Our mission is to provide clean water, education, and healthcare to underprivileged communities around the world. We believe in a world where everyone has access to the basic necessities of life, and we work tirelessly to make this a reality.</p>
          <div className="row">
            <div className="col-lg-4 col-md-6 col-sm-6">
              <div className="single-cat text-center mb-50">
                <div className="cat-icon">
                  <img src={Drink} alt="Clean Water Icon" />
                </div>
                <div className="cat-cap">
                  <h5>Clean Water</h5>
                  <p>We provide access to clean and safe drinking water through the construction of wells and water purification systems.</p>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-6">
              <div className="single-cat text-center mb-50">
                <div className="cat-icon">
                  <img src={Education} alt="Education Icon" />
                </div>
                <div className="cat-cap">
                  <h5>Education</h5>
                  <p>We support educational programs and build schools to ensure children receive the education they deserve.</p>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-6">
              <div className="single-cat text-center mb-50">
                <div className="cat-icon">
                  <img src={Health} alt="Healthcare Icon" />
                </div>
                <div className="cat-cap">
                  <h5>Healthcare</h5>
                  <p>We offer medical services, vaccinations, and health education to improve the overall health of communities.</p>
                </div>
              </div>
            </div>
          </div>

          <h2>Team Members</h2>
          <div className="row">
            <div className="col-md-6">
              <Carousel fade className="Team_Members">
                <Carousel.Item>
                  <img className="d-block w-100" src={Member1} alt="John Doe - Project Manager" />
                  <Carousel.Caption>
                    <h3>John Doe</h3>
                    <p>Project Manager</p>
                  </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                  <img className="d-block w-100" src={Member2} alt="Jane Smith - Health Specialist" />
                  <Carousel.Caption>
                    <h3>Jane Smith</h3>
                    <p>Health Specialist</p>
                  </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                  <img className="d-block w-100" src={Member3} alt="Mike Johnson - Education Coordinator" />
                  <Carousel.Caption>
                    <h3>Mike Johnson</h3>
                    <p>Education Coordinator</p>
                  </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                  <img className="d-block w-100" src={Member4} alt="Emily Davis - Water Engineer" />
                  <Carousel.Caption>
                    <h3>Emily Davis</h3>
                    <p>Water Engineer</p>
                  </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                  <img className="d-block w-100" src={Member5} alt="David Wilson - Logistics Manager" />
                  <Carousel.Caption>
                    <h3>David Wilson</h3>
                    <p>Logistics Manager</p>
                  </Carousel.Caption>
                </Carousel.Item>
              </Carousel>
            </div>
            <div className="col-md-6">
              <h4>About Us</h4>
              <p><strong>Welcome to Uplift Bharat</strong></p>
              <p style={{ textAlign: 'left' }}>
                where compassion meets action. Our mission is to connect caring individuals like you with reputable charities and causes that make a real difference in communities around the world.
                <br />
                At Uplift Bharat, we believe in the power of collective giving. We provide a platform for registered charities to showcase their impactful projects and initiatives, allowing donors to explore and support causes that resonate with their values and passions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
