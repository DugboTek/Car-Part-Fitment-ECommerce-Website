import React, { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "../../Styles/HomePageStyles/Banner.css";

const offers = [
  "Track your order to know exactly when your parts will arrive!",
  "We are here to help!   Click Contact Us for assistance.",
  "Save vehicles in My Garage for personalized shopping!",
];

function Banner() {
    const [currentOffer, setCurrentOffer] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
  
    useEffect(() => {
      setIsAnimating(true);
  
      const timer = setTimeout(() => {
        setCurrentOffer((prevOffer) => (prevOffer + 1) % offers.length);
        setIsAnimating(false);
      }, 6000);
  
      return () => clearTimeout(timer);
    }, [currentOffer]);
  
    const prevOffer = () => {
      setIsAnimating(true);
  
      setCurrentOffer((prevOffer) => (prevOffer === 0 ? offers.length - 1 : prevOffer - 1));
  
      setTimeout(() => {
        setIsAnimating(false);
      }, 500);
    };
  
    const nextOffer = () => {
      setIsAnimating(true);
  
      setCurrentOffer((prevOffer) => (prevOffer + 1) % offers.length);
  
      setTimeout(() => {
        setIsAnimating(false);
      }, 500);
    };
  
    return (
      <div className="banner">
        <div className={`banner-content ${isAnimating ? "animating" : ""}`}>
          <FaChevronLeft className="chevron" onClick={prevOffer} />
          <p className={`offer ${isAnimating ? "slide-out" : "slide-in"}`}>
            {offers[currentOffer]}
          </p>
          <FaChevronRight className="chevron" onClick={nextOffer} />
        </div>
      </div>
    );
  }
  

export default Banner;
