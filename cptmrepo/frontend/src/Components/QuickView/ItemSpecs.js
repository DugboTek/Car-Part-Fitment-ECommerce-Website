import { Grid, GridItem } from "@chakra-ui/react";
import { Box } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import {
  ChevronRightIcon,
  ChevronLeftIcon,
  StarIcon,
  CheckIcon,
  ArrowUpDownIcon,
} from "@chakra-ui/icons";
import {
  Flex,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
} from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";
import { CloseButton } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import { Image } from "@chakra-ui/react";
import React, { useState } from "react";
import "../../Styles/QuickViewStyles/ItemSpecsStyles.css";
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";
import { FaShoppingCart } from "react-icons/fa";
import { RiHeartAddLine, RiTruckLine, RiHeartFill } from "react-icons/ri";
import { Icon } from "@chakra-ui/react";
import { convertLink } from "../util/s3TOazureblob.js";
import ProductInfo from "../ProductPage/ProductInfo";
import checkIcon from "../../Images/checkmark.png";
import CancelIcon from "../../Images/redx.png";
import QuestionIcon from "../../Images/questionmark.png";
import { CiDeliveryTruck } from "react-icons/ci";
import { useAppContext } from "../../AppContext";

function Capitalize(word) {
  if (word && word !== "") {
    let final_word = word[0].toUpperCase();
    final_word += word.slice(1);
    return final_word;
  }
  return word; 
}

export function ItemSpecs({ product }, { background }) {
  const [isHeartFilled, setIsHeartFilled] = useState(false);
  let { selectedYear, selectedMake, selectedModel } = useAppContext();
  if (selectedYear == null) {
    selectedYear = sessionStorage.getItem("year");
    selectedMake = sessionStorage.getItem("make");
    selectedModel = sessionStorage.getItem("model");
  }
  const handleHeartClick = () => {
    setIsHeartFilled((prevIsHeartFilled) => !prevIsHeartFilled);
  };
  const heartoff = new URL(
    "https://th.bing.com/th/id/R.9f27f9e5650e0d582760cd6b9e04ce2a?rik=X74gfvNu9JDnrA&riu=http%3a%2f%2fcdn.onlinewebfonts.com%2fsvg%2fimg_56734.png&ehk=v0zkOQmQp%2bSFUb3AvAmD4mTd%2ffaH1CWUImU7fYELFeg%3d&risl=&pid=ImgRaw&r=0"
  );
  const hearton = new URL(
    "https://th.bing.com/th/id/OIP.yHflGASc9dliE2qjqOlfiAHaGV?pid=ImgDet&rs=1"
  );
  const heartImages = { heartoff, hearton };
  const [heart, setHeart] = useState(true);

  const [value, setValue] = React.useState("");
  const handleChange = (event) => setValue(event.target.value);

  const partOne = new URL(
    "https://www.zoro.com/static/cms/product/full/Emery%20Jensen%20Distribution%20LLC_8008302xxA.epsxxMaxxx426969.jpeg"
  );
  const partTwo = new URL(
    "https://th.bing.com/th/id/R.1e798bcdc2bda6e28a5996c6f6f36db1?rik=2XnrYkGlvUMvUA&pid=ImgRaw&r=0"
  );
  const partImages = { partOne, partTwo };
  const [part, setPart] = useState("false");

  const [close, setClose] = useState("false");

  const heartChangeHandler = () => {
    if (!heart) {
      setHeart(true);
    } else {
      setHeart(false);
    }
  };

  var partNumber = 1;

  var property = {
    imageUrl:
      "https://th.bing.com/th/id/R.1e798bcdc2bda6e28a5996c6f6f36db1?rik=2XnrYkGlvUMvUA&pid=ImgRaw&r=0",
    imageAlt: "Picture of a Car",
    currPicNum: 1,
    endingPicNum: 2,
    heartStatus: "https://cdn.onlinewebfonts.com/svg/img_573153.png",
  };

  const partChangeHandler = () => {
    if (!part) {
      partNumber = partNumber + 1;
      setPart(true);
    } else {
      partNumber = partNumber - 1;
      setPart(false);
    }
  };

  const productImg = convertLink(product.image_url);

  return (
    <div className="modal-popup">
      <div className="image-container">
        <Image src={productImg} alt={property.imageAlt} />
        <Grid
          templateColumns="repeat(4, 1fr)"
          color="black"
          fontSize="1.5em"
          gap={0}
        >
          <Box w="100%" h="10" />
          <Box w="100%" h="10">
            <ChevronLeftIcon onClick={partChangeHandler} />
          </Box>
          <Box w="100%" h="10">
            {!part ? "1/1" : "1/1"}
          </Box>
          <Box w="100%" h="10">
            <ChevronRightIcon onClick={partChangeHandler} />
          </Box>
        </Grid>
      </div>
      <div className="description-container">
        <div className="pi-description-container">
          <div className="description-header">
            <div className="description-title">
              <div className="name-subcat-title">
                <h1 className="quickview-product-title">
                  {product.description}{" "}
                </h1>
                <h2>In {product.sub_category}s</h2>
              </div>
              <div className="pi-heart-container" onClick={handleHeartClick}>
                {isHeartFilled ? (
                  <RiHeartFill className="heart-icon" />
                ) : (
                  <RiHeartAddLine className="heart-icon" />
                )}
              </div>
            </div>
            <div className="stars-brand">
              <div className="star-container">
                <StarIcon />
                <StarIcon />
                <StarIcon />
                <StarIcon />
                <StarIcon className="empty-star" color="white"></StarIcon>
              </div>
              <div className="brand-container">
                <Text as="ins">{product.make}</Text>
              </div>
            </div>
          </div>

          <div className="pi-price-container">
            <div className="pi-unit-price">
              {/* <h1>Unit Price</h1> */}
              <h2>${product.price}</h2>
            </div>
          </div>
          <div className="pi-shipdetails-container quickview-ship-gap">
            {/* <div className="prod-description-box">
              <Text as="i">
                <strong>Net Weight:</strong> {product.nw.toFixed(3)} kg
              </Text>
              {/* <Text as="i">
              <strong>Gross Weight:</strong> {product.gw.toFixed(3)} kg
            </Text> */}
            {/* <Text as="i">
                <strong>Volume:</strong> {product.m3.toFixed(3)} m³
              </Text>
            </div>
            <div className="pi-ship-container">
              <CiDeliveryTruck className="quickview-truck" size={50}>
                {" "}
              </CiDeliveryTruck>
              <div className="ships-text">Ships in 1-2 days</div>
            </div> */}
          </div>
          <br />

          <CheckFit
            product={product}
            selectedMake={selectedMake}
            selectedModel={selectedModel}
            selectedYear={selectedYear}
          ></CheckFit>
          <div className="pi-cart-container">
            <div className="qty">
              <h1>Qty:</h1>
              <SliderInput />
            </div>
            <Button
              w="200px"
              h="80px"
              leftIcon={<Icon as={FaShoppingCart} boxSize={6} />}
              mt={4}
            >
              Add to Cart
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function AddBut() {
  const {
    isOpen: isVisible,
    onClose,
    onOpen,
  } = useDisclosure({ defaultIsOpen: true });

  const CARTADD = (
    <Button
      w="200px"
      h="80px"
      leftIcon={<Icon as={FaShoppingCart} boxSize={6} />}
      mt={4}
    >
      Add to Cart
    </Button>
  );

  return isVisible ? (
    <Alert status="success">
      <AlertIcon />
      <Box>
        <AlertTitle>Success!</AlertTitle>
        <AlertDescription>
          Your application has been received. We will review your application
          and respond within the next 48 hours.
        </AlertDescription>
      </Box>
      <CloseButton
        alignSelf="flex-start"
        position="relative"
        right={-1}
        top={-1}
        onClick={onClose}
      />
    </Alert>
  ) : (
    <Button onClick={onOpen}>Show Alert</Button>
  );
}

function SliderInput() {
  const [value, setValue] = React.useState(1);
  const handleChange = (value) => setValue(value);

  return (
    <Flex>
      <NumberInput maxW="100px" mr="2rem" value={value} onChange={handleChange}>
        <NumberInputField />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
    </Flex>
  );
}

function CheckFit({ product, selectedMake, selectedModel, selectedYear }) {
  console.log("Selected Make:", selectedMake);
  console.log("Selected Model:", selectedModel);
  console.log("Selected Year:", selectedYear);
  let fitState = "FIT";

  console.log("Product Make:", product.make);
  console.log("Product Model:", product.model);
  console.log("Product Years Accepted:", product.years_accepted);

  if (
    product.make === selectedMake &&
    product.model === selectedModel &&
    product.years_accepted.includes(parseInt(selectedYear))
  ) {
    console.log("Fit is true");
    fitState = "FIT";
  } else if (selectedYear === "null") {
    fitState = "QUESTIONFIT";
  } else {
    console.log("Fit is false");
    fitState = "NOFIT";
  }

  if (fitState === "FIT") {
    return (
      <div className="guaranteed-fit-container">
        <img src={checkIcon} alt="checkmark" />
        <div className="gfit-text">
          <h1>Guaranteed Fit</h1>
          <h2>
            This {product.sub_category} fits your <br></br> {selectedYear}{" "}
            {Capitalize(selectedMake)} {Capitalize(selectedModel)}
          </h2>
        </div>
      </div>
    );
  } else if (fitState === "NOFIT") {
    return (
      <div className="guaranteed-fit-container">
        <img src={CancelIcon} alt="cancelmark" />
        <div className="gfit-text">
          <h1>Vehicle Fitment</h1>
          <h2>
            This {product.sub_category} does NOT FIT your <br></br>
            {selectedYear} {Capitalize(selectedMake)} {Capitalize(selectedModel)}
          </h2>
        </div>
      </div>
    );
  } else if (fitState === "QUESTIONFIT") {
    return (
      <div className="guaranteed-fit-container">
        <img src={QuestionIcon} alt="cancelmark" />
        <div className="gfit-text">
          <h1>Vehicle Fitment</h1>
          <h2>This {product.sub_category} might fit.</h2>
          <h3>Please select a vehicle in your Garage.</h3>
        </div>
      </div>
    );
  }
}
export default ItemSpecs;

{
  /* <div className="description-header">
          <div className="description-title">
            <h1>{product.description} </h1>
            <div className="heart-container" onClick={handleHeartClick}>
              {isHeartFilled ? (
                <RiHeartFill className="heart-icon" />
              ) : (
                <RiHeartAddLine className="heart-icon" />
              )}
            </div>
          </div>
          <div className="stars-brand">
            <div className="star-container">
              <StarIcon />
              <StarIcon />
              <StarIcon />
              <StarIcon />
              <StarIcon />
              <div className="star-count">(26)</div>
            </div>
            <div className="brand-container">
              <Text as="ins">{product.make}</Text>
            </div>
          </div>
        </div>

        <div className="price-container">
          <h1>Unit Price</h1>
          <h2>${product.price}</h2>
          <div className="ship-container">
            <RiTruckLine size={50}></RiTruckLine>
            <div className="ships-text">Ships in 1-2 days</div>
          </div>
        </div>
        <div className="prod-description-box">
          <Text as="i">
            <strong>Net Weight:</strong> {product.nw.toFixed(3)} kg
          </Text>
          <Text as="i">
            <strong>Gross Weight:</strong> {product.gw.toFixed(3)} kg
          </Text>
          <Text as="i">
            <strong>Volume:</strong> {product.m3.toFixed(3)} m³
          </Text>
        </div>
        <div className="cart-container">
          <div className="qty">
            <h1>Qty:</h1>
            <SliderInput />
          </div>
          <Button
            w="200px"
            h="80px"
            leftIcon={<Icon as={FaShoppingCart} boxSize={6} />}
            mt={4}
          >
            Add to Cart
          </Button>
        </div>
      </div> */
}
{
  /* <Grid
        h="30em"
        w="30em"
        templateRows="repeat(3, 1fr)"
        templateColumns="repeat(2, 1fr)"
        gap={5}
      >
        <GridItem rowSpan={3} colSpan={1} bg={background}>
          <br />
          <br />
          <br />
          <Image
            src="https://th.bing.com/th/id/OIP.G0V_9qWp5vw22dxNqpNL7wHaHa?pid=ImgDet&rs=1"
            alt={property.imageAlt}
          />
          <br />
          <br />
          <br />
          <br />
          <Grid
            templateColumns="repeat(4, 1fr)"
            color="black"
            fontSize="1.5em"
            gap={0}
          >
            <Box w="100%" h="10" />
            <Box w="100%" h="10">
              <ChevronLeftIcon onClick={partChangeHandler} />
            </Box>
            <Box w="100%" h="10">
              {!part ? "1/1" : "1/1"}
            </Box>
            <Box w="100%" h="10">
              <ChevronRightIcon onClick={partChangeHandler} />
            </Box>
          </Grid>
        </GridItem>

        <GridItem
          className="description-grid"
          colSpan={1}
          gap={3}
          bg={background}
        >
          <Grid templateColumns="repeat(1, 1fr)" gap={1}>
            <Box w="100%" h="10" bg={background} />
            <Box w="100%" h="10" bg={background}>
              <Grid templateColumns="repeat(5, 1fr)" gap={0}>
                <h1>{product.description} </h1>
                <Box w="100%" h="10" bg={background} />
                <Box w="100%" h="10" bg={background} />
                <Image
                  src={!heart ? heartImages.heartoff : heartImages.hearton}
                  alt="heart-button"
                  onClick={heartChangeHandler}
                />
              </Grid>
            </Box>

            <Box w="100%" bg={background}>
              <Grid templateColumns="repeat(1, 1fr)" gap={0}>
                <Grid templateColumns="repeat(9, 1fr)" gap={0}>
                  <GridItem w="100%" bg={background}>
                    <StarIcon />
                  </GridItem>
                  <GridItem w="100%" bg={background}>
                    <StarIcon />
                  </GridItem>
                  <GridItem w="100%" bg={background}>
                    <StarIcon />
                  </GridItem>
                  <GridItem w="100%" bg={background}>
                    <StarIcon />
                  </GridItem>
                  <GridItem w="100%" bg={background}>
                    <StarIcon />
                  </GridItem>
                  <GridItem w="100%" bg={background} color="black">
                    {" "}
                    (26)
                  </GridItem>
                  <GridItem w="100%" bg={background} color="black" />
                  <GridItem w="100%" bg={background} color="black" />
                  <GridItem w="100%" bg={background} color="black" />
                </Grid>
                <GridItem w="100%" bg={background} color="black">
                  <Box w="100%" h="10" bg={background}>
                    <Text as="ins">Brand Name</Text>
                  </Box>
                </GridItem>
              </Grid>
            </Box>

            <Box w="100%" h="10" bg={background}>
              <Grid templateColumns="repeat(2, 1fr)" gap={6}>
                <Box
                  w="100%"
                  h="7"
                  textAlign={"left"}
                  bg={background}
                  color="black"
                  fontSize="20px"
                  fontWeight={"bold"}
                >
                  <h>${product.price}</h>
                </Box>
                <Grid templateColumns="repeat(2, 1fr)">
                  <GridItem w="100%" h="50%" bg={background}>
                    {" "}
                    <Image
                      boxSize="40px"
                      h="25px"
                      src="https://th.bing.com/th/id/R.baba532ecb397d4766aa0c80d3c38c1b?rik=VaRaCJpv02P1eg&riu=http%3a%2f%2fcdn.onlinewebfonts.com%2fsvg%2fimg_518646.png&ehk=V18Mv7nDxORRnEnLaZ789P%2b2NOrrAgTOftQn9mXhwMA%3d&risl=&pid=ImgRaw&r=0"
                    />
                  </GridItem>
                  <GridItem>Ships.. </GridItem>
                </Grid>
              </Grid>
            </Box>
            <Box
              w="100%"
              h="100px"
              bg={background}
              paddingTop="10px"
              className="prod-description-box"
            >
              <Text as="i">
                <strong>Net Weight:</strong> {product.nw.toFixed(3)} kg
              </Text>
              <Text as="i">
                <strong>Gross Weight:</strong> {product.gw.toFixed(3)} kg
              </Text>
              <Text as="i">
                <strong>Volume:</strong> {product.m3.toFixed(3)} m³
              </Text>
            </Box>
            <Box w="100%" h="10" bg={background}></Box>
            <Box w="100%" h="10" bg={background}>
              <Grid templateColumns="repeat(4, 1fr)" padding="2px" gap={1}>
                <QBox />
                <GridItem w="100%" h="10">
                  <Button w="120px" colorScheme="blue">
                    Add to Cart
                  </Button>
                </GridItem>
              </Grid>
            </Box>
            <Box w="100%" h="10" bg={background}>
              <Grid templateColumns="repeat(1, 1fr)" gap={2}>
                <GridItem
                  w="100%"
                  h="7px"
                  textAlign="left"
                  color="black"
                  fontSize="0.8em"
                  paddingBottom="10px"
                  paddingTop="40px"
                >
                  Guarenteed Fit
                </GridItem>

                <GridItem alignText={"left"} w="100%" h="3.5em" bg="#E4E3E3">
                  <Grid templateColumns="repeat(4, 1fr)" gap={0}>
                    <GridItem alignText={"left"} w="70%" h="15" bg="#E4E3E3">
                      <CheckIcon
                        padding="5px"
                        height="40px"
                        width="40px"
                        color="#28CA4B"
                      />
                    </GridItem>
                    <GridItem
                      alignText={"left"}
                      colSpan="3"
                      fontSize={"15"}
                      w="100%"
                      h="15"
                      paddingTop="5px"
                    >
                      <Text as="b">PART FITS!</Text>{" "}
                      <Text as="i">2021 Ford F-250 Super Duty 6'8"</Text>
                    </GridItem>
                  </Grid>
                </GridItem>
              </Grid>
            </Box>
          </Grid>
        </GridItem>
      </Grid> */
}
