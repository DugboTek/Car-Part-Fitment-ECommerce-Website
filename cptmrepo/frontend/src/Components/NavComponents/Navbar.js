// Ali Moulton

import { useRef } from "react";
import React, { useState } from "react";
import "../../Styles/main.css";
import "../../Styles/NavStyles/Navbar.css";
import AliCat from "./aliCat";
import VehicleMenu from "./VehicleMenu";
import { useHistory } from "react-router-dom";

function Navbar() {
  const navRef = useRef();
  const history = useHistory();

  const showNavbar = () => {
    navRef.current.classList.toggle("responsive_nav");
  };
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [isDropdownVisibleV, setIsDropdownVisibleV] = useState(false);

  const handleMouseEnter = () => {
    setIsDropdownVisible(true);
  };
  const handleMouseEnterV = () => {
    setIsDropdownVisibleV(true);
  };

  const handleMouseLeave = () => {
    setIsDropdownVisible(false);
  };
  const handleMouseLeaveV = () => {
    setIsDropdownVisibleV(false);
  };

  const handleClick = () => {
    history.push("/Contact");
    history.go();
  };

  return (
    <div className="categories-dropdown-containera">
      <h1
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{ zIndex: "2" }}
      >
        {" "}
        SHOP BY CATEGORIES
        {isDropdownVisible && <AliCat />}
      </h1>

      <h1
        onMouseEnter={handleMouseEnterV}
        onMouseLeave={handleMouseLeaveV}
        style={{ zIndex: "0" }}
      >
        {" "}
        SHOP BY VEHICLES
        {isDropdownVisibleV && <VehicleMenu />}{" "}
      </h1>
      <h1 onClick={() => handleClick()}>CONTACT US</h1>
    </div>
  );
}
export default Navbar;
