import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import Image1 from '../Images/Donate.jpg';
import Image2 from '../Images/Donate.jpg';
import './Ads.css';

function Ads() {
  return (
    <div className="Ads">
      <div className="Ads-Contains">
        <Carousel>
          <Carousel.Item>
            <div className="d-flex justify-content-between">
              <img
                className="d-block"
                src={Image1}
                alt="First slide"
              />
              <img
                className="d-block"
                src={Image2}
                alt="Second slide"
              />
              <img
                className="d-block"
                src={Image1}
                alt="Third slide"
              />
            </div>
          </Carousel.Item>
          <Carousel.Item>
            <div className="d-flex justify-content-between">
              <img
                className="d-block"
                src={Image1}
                alt="Fourth slide"
              />
              <img
                className="d-block"
                src={Image2}
                alt="Fifth slide"
              />
              <img
                className="d-block"
                src={Image1}
                alt="Sixth slide"
              />
            </div>
          </Carousel.Item>
          {/* Add more Carousel.Item as needed for additional images */}
        </Carousel>
      </div>
    </div>
  );
}

export default Ads;
