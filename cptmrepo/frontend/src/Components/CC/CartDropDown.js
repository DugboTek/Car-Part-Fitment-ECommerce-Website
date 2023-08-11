//Bella White
import { Box } from "@chakra-ui/react";
import * as React from "react";
import { useState } from "react";
import { useDisclosure } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import { Input } from "@chakra-ui/react";
import Checkout from "./Checkout.js";
import { Heading } from "@chakra-ui/react";
import { Card, CardHeader, CardBody, CardFooter } from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";
import { Stack, HStack, VStack } from "@chakra-ui/react";
import { Grid, GridItem } from "@chakra-ui/react";
import CartIcon from "../../Images/carticon.png";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from "@chakra-ui/react";

export default function CartDropDown({ cartContents, cartImage }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  const flower = [
    {
      name: "Door Mirror",
      price: 258.37,
      count: 1,
      counterVal: 1,
      inCart: true,
    },
    {
      name: "Grille",
      price: 140.99,
      count: 1,
      counterVal: 1,
      inCart: true,
    },
  ];

  const [cart, setCart] = useState(flower);

  const addToCart = (i) => {
    setCart((prevState) =>
      prevState.map((item, o) => {
        if (i === o) {
          return {
            ...item,
            inCart: true,
            count: item.counterVal,
          };
        }
        return item;
      })
    );
  };

  const increaseQuantity = (i) => {
    setCart((prevCart) =>
      prevCart.map((item, o) => {
        if (i === o && item.inCart) {
          if (item.count > 9) {
            return item;
          } else return { ...item, count: item.count + 1 };
        } else if (i === o) {
          if (item.counterVal > 9) {
            return item;
          } else
            return {
              ...item,
              counterVal: item.counterVal + 1,
            };
        }
        return item;
      })
    );
  };

  const decreaseQuantity = (i) => {
    setCart((prevCart) =>
      prevCart.map((item, o) => {
        if (i === o && item.inCart) {
          if (item.count > 1) {
            return { ...item, count: item.count - 1 };
          } else {
            return item;
          }
        } else if (i === o && item.counterVal > 1) {
          return {
            ...item,
            counterVal: item.counterVal - 1,
          };
        }
        return item;
      })
    );
  };

  const removeFromCart = (i) => {
    setCart((prevCart) =>
      prevCart.map((item, o) => {
        if (i === o) {
          return {
            ...item,
            count: 0,
            counterVal: 1,
            inCart: false,
          };
        }
        return item;
      })
    );
  };

  const cartCountTotal = cart.reduce((acc, item) => acc + item.count, 0);
  const cartPriceTotal = cart.reduce(
    (acc, item) => acc + item.price * item.count,
    0
  );

  const cartTotals = () =>
    cartCountTotal === 0 ? (
      <b>Cart is empty</b>
    ) : (
      <>
        <b>
          <Grid templateColumns="repeat(1, 1fr)" gap={1}>
            <GridItem w="100%" h="10">
              <b>Items in Cart: {cartCountTotal}</b>
            </GridItem>
            <GridItem marginBottom="20px" w="100%" h="10">
              {" "}
              <Button marginTop="5px" color="facebook">
                Total Price: $
                {Number.isInteger(cartPriceTotal)
                  ? cartPriceTotal
                  : cartPriceTotal.toFixed(2)}
              </Button>
            </GridItem>
          </Grid>
        </b>
      </>
    );

  const summary = cart.map((item) => (
    <Card marginBottom="1em">
      <CardBody>
        <Grid templateColumns="repeat(3, 1fr)" gap={6}>
          <GridItem>
            <Button marginRight="4px" colorScheme="blue">
              Name:{" "}
            </Button>{" "}
            {item.name}
          </GridItem>{" "}
          <GridItem>
            <Button marginRight="6px" colorScheme="blue">
              Quantity:{" "}
            </Button>
            {item.count}
          </GridItem>{" "}
          <GridItem>
            {" "}
            <Button marginRight="6px" colorScheme="blue">
              Price:{" "}
            </Button>{" "}
            {item.price}
          </GridItem>
        </Grid>
      </CardBody>
    </Card>
  ));

  const exportSum = summary.map((gridPart) => (
    <Grid templateColumns="repeat(1, 1fr)" gap={6}>
      <GridItem w="100%">{gridPart}</GridItem>
    </Grid>
  ));

  const cartItems = cart.map((item, i) => (
    <React.Fragment key={item.name}>
      {item.inCart && (
        <>
          <Card>
            <Heading margin="5px" size="md">
              {item.name}
            </Heading>
            <CardBody>
              <Stack spacing="4">
                <Box>
                  <Grid
                    marginTop="-10px"
                    templateColumns="repeat(5, 1fr)"
                    borderColor="black"
                    padding="5px"
                    borderWidth="1px"
                    gap={4}
                  >
                    <GridItem
                      marginLeft="3px"
                      alignContent="center"
                      rowSpan={1}
                      colSpan={2}
                      bg="white"
                    >
                      {" "}
                      <p>
                        <button
                          marginLeft="7px"
                          onClick={() => decreaseQuantity(i)}
                        >
                          -
                        </button>{" "}
                        {item.count}{" "}
                        <button onClick={() => increaseQuantity(i)}>+</button>
                      </p>
                    </GridItem>
                    {/* <GridItem colSpan={2} bg='#E6E6E3' > <Heading  size='sm'>{item.name}</Heading> </GridItem> */}
                    <GridItem colSpan={3}>
                      {" "}
                      <p paddingLeft="5px">
                        Total: $
                        {Number.isInteger(item.count * item.price)
                          ? item.count * item.price
                          : `${(item.count * item.price).toFixed(2)}`}
                      </p>
                    </GridItem>
                  </Grid>
                  {/* <Heading size='xs' textTransform='uppercase'> */}
                  {/* <p>
              Subtotal: $
              {Number.isInteger(item.count * item.price)
                ? item.count * item.price
                : `${(item.count * item.price).toFixed(2)}`}
            </p>
          </Heading>
          <p>
              Item Count: <button onClick={() => decreaseQuantity(i)}>-</button>{" "}
              {item.count} <button onClick={() => increaseQuantity(i)}>+</button>
            </p> */}
                </Box>
              </Stack>
            </CardBody>
          </Card>

          <Button
            size="xs"
            marginTop="0.8em"
            marginBottom="0.8em"
            textColor="black"
            bg="white"
            onClick={() => removeFromCart(i)}
          >
            <Text as="ins">Remove From Cart</Text>
          </Button>
          <hr />
        </>
      )}
    </React.Fragment>
  ));

  const cartProducts = () => (
    <div className="flexParent">
      {cart.map((item, i) => (
        <div key={item.name}>
          {/* <p>{item.name}</p>
          <p>Price: ${item.price}</p> */}
          {!item.inCart ? (
            <>
              {/* <button onClick={() => decreaseQuantity(i)}>-</button>
              <input readOnly type="text" value={item.counterVal} />
              <button onClick={() => increaseQuantity(i)}>+</button>
              <br /> ADD TO CART BUTTON */}
              <button onClick={() => addToCart(i)}></button>
            </>
          ) : (
            <p>
              <p marginTop="10px"></p>
            </p>
          )}
        </div>
      ))}
    </div>
  );

  return (
    <Box>
      <>
        <Button ref={btnRef} colorScheme="white" onClick={onOpen}>
          <img src={CartIcon} alt="shopping cart" />
        </Button>
        {/* <p id="quant">{currentItems}</p> */}

        <Drawer
          isOpen={isOpen}
          placement="right"
          onClose={onClose}
          finalFocusRef={btnRef}
        >
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>
              <Button size="lg">My Cart</Button>
            </DrawerHeader>

            <DrawerBody>
              <div>
                {cartItems}
                {cartTotals()}
                {cartProducts()}
              </div>
            </DrawerBody>

            <DrawerFooter>
              <Button variant="outline" mr={3} onClick={onClose}>
                Cancel
              </Button>
              <Checkout itemsInCart={exportSum} />
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </>
    </Box>
  );
}
