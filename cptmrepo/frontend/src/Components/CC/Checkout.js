//Bella White
import { Box } from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import { Card, CardHeader, CardBody, CardFooter } from "@chakra-ui/react";
import { Grid, GridItem } from "@chakra-ui/react";
import { Stack, HStack, VStack } from "@chakra-ui/react";
import { Heading } from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";
import { Button, ButtonGroup } from "@chakra-ui/react";
import { Divider } from "@chakra-ui/react";
import PaymentForm from "./PaymentForm.jsx";
import DeliveryForm from "./DeliveryForm.jsx";
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription
} from "@chakra-ui/react";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton
} from "@chakra-ui/react";
import React from "react";
import CartIcon from "../../Images/carticon.png";

import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";


function Cart() {
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
  
  return (

    
    <div className="cart-and-btn">
      <div className="cart-cart-container">
        <div className="icon">
          <img src={CartIcon} alt="shopping cart" />
        </div>
        <div className="quant-text">
          <p id="quant">{currentItems}</p>
        </div>
      </div>
      <br></br>
      <br></br>

      {/* <div className='add-btn'>
          <Button
            onClick={addToCart}
          >Add </Button>
        </div>
        <div className='rem-btn'>
          <Button
            onClick={removeFromCart}
          >Remove </Button>
        </div> */}
    </div>
  );
}


export default function Checkout({itemsInCart}) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button bgColor='#000080' color='white' onClick={onOpen}>Checkout</Button>
      <Modal size={"full"} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <Heading padding="0.7em" size="xl" textTransform="uppercase">
            Checkout
          </Heading>
          <ModalCloseButton />
          <ModalBody>
            <Tabs variant="soft-rounded" textColor="black" ColorScheme="blue">
              <TabList marginBottom="0.3em">
                <Tab marginBottom="0.3em">Shipment</Tab>
                <Tab marginBottom="0.3em">Payment</Tab>
              </TabList>
              <TabPanels>
                <TabPanel bg="#D3D3D3">
                  <DeliveryForm cartList={itemsInCart} />
                </TabPanel>

                <TabPanel bg="#D3D3D3">
                  <PaymentForm />
                </TabPanel>
              </TabPanels>
            </Tabs>
          </ModalBody>
          <ModalFooter>
            {/* <Button colorScheme='green' mr={3} onClick={onClose}>
                Proccess Order
              </Button> */}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
