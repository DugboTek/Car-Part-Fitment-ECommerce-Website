//Allie Moulton
import React from "react";
import Navbar from "./Navbar";
import MainLogo from "./MainLogo";
import SearchBar from "./SearchBar";
import Cart from "./Cart";
import AccountMenu from "./AccountMenu";
import "../../Styles/NavStyles/Header.css";
import NavGarage from "./NavGarage";

function Header({ onSearch }) {
  const flower = [{
    name: "ItemX",
    price: 19.99,
    count: 1,
    counterVal: 1,
    inCart: true
  },
  {
    name: "ItemY",
    price: 14.99,
    count: 1,
    counterVal: 1,
    inCart: true
  }];

  return (
    <div className="header-container">
      <div className="header-top-container">
        <div className="header-left-container">
          <MainLogo />
        </div>
        <div className="header-middle-container">
          <div className="sb-container">
            {<SearchBar onSearch={onSearch} />}
          </div>
        </div>
        <div className="header-right-container">
          <div className="carticon-container">
            <Cart products={flower} id="Cart" />
          </div>
          <div className="acc-cont">
            <AccountMenu id="AccMen" />
          </div>
          <div >
            {/* <Cart id="Cart" /> */}
          </div>
        </div>
      </div>
      <div className="header-bottom-container">
        <NavGarage />
        <Navbar className='navbar-header' />
      </div>
    </div>
  );
}

export default Header;
