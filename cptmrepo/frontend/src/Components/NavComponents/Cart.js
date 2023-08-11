// Ali Moulton
import { VisuallyHidden, VisuallyHiddenInput } from '@chakra-ui/react';
import {
  Button,
  // Menu,
  // MenuButton,
  // MenuList,
  // MenuItem,
  // MenuItemOption,
  // MenuOptionGroup,
  MenuDivider,
  IconButton,
} from "@chakra-ui/react";
import "../../Styles/main.css";
import "../../Styles/Cart.css";
import React from "react";
import CartIcon from "../../Images/carticon.png";
import Checkout from '../CC/ExportCheckout.js';
import { SunIcon, HamburgerIcon } from "@chakra-ui/icons";
import { Badge } from '@chakra-ui/react';


function Cart({products}) {

  

  const flower = [{
    name: "   Mirror",
    price: 272.77,
    count: 1,
    counterVal: 1,
    inCart: true
  },
  {
    name: "   Cable",
    price: 375.50,
    count: 1,
    counterVal: 1,
    inCart: true
  }];
  
  const quantity = 0;
  const [currentItems, setCurrentItems] = React.useState(quantity);
  const addToCart = () => {
    setCurrentItems((prevValue) => prevValue + 1);
    // changeIcon();
  };
  const removeFromCart = () => {
    if (currentItems >= 1) {
      setCurrentItems((prevValue) => prevValue - 1);
    }
  };
  const onKeyDownHandler = e => {
    if (e.keyCode === 13) {
      this.sendMessage();
    }
  };
  // const changeIcon() {
  //   icon = document.getElementById(".icon");
  //   icon.style.width = 10px;
  //   revertIcon()
  // }

  // const revertIcon(){

  // }
  return (
    <div className="cart-and-btn">
      <div className="cart-cart-container">
        <div className="icon">
          {/* <img src={CartIcon} alt="shopping cart" /> */}
          {/* <Button bgColor='white'
            onKeyUp={addToCart}
          > */}
             <Checkout prods={flower}/> 
          {/* </Button> */}
          
        </div>
       
        {currentItems > 0 &&(
        <div className="quant-text">
          <Badge><p id="quant">{currentItems}</p></Badge>
        </div>
        )}

      </div>
      <br></br>
      <br></br>
{/* 
      <div bgColor='white' className='add-btn'> */}

        {/* <VisuallyHidden>
        
          <Button bgColor='white'
            onClick={addToCart}
          >add </Button>
          </VisuallyHidden> */}
        {/* </div> */}
        {/* <div className='rem-btn'>
          <Button
            onClick={removeFromCart}
          >Remove </Button>
        </div> */}
    </div>
  );
}

// function addToCart(count) {
//   return count++;
// }

export default Cart;
