//Bella White
import * as React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import CartDropDown from "./CartDropDown.js";

function ExportCheckout({prods, cartIcon}) {

  const testProduct = prods;

  return (
    <ChakraProvider>
      <CartDropDown cartImage={cartIcon} products={testProduct} />
    </ChakraProvider>
  );
}

export default ExportCheckout;
