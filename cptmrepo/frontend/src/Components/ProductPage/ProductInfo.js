import { Grid, GridItem } from "@chakra-ui/react";

import { Box } from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import { CloseButton } from "@chakra-ui/react";
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
import { Button } from "@chakra-ui/react";
import { Image } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { Input } from "@chakra-ui/react";
import "../../Styles/ProductPage/ProductInfoStyles.css";
import QBox from "../Quantity.js";
import { FaShoppingCart } from "react-icons/fa";
import { RiHeartAddLine, RiTruckLine, RiHeartFill } from "react-icons/ri";
import { Icon } from "@chakra-ui/react";
import checkIcon from "../../Images/checkmark.png";
import CancelIcon from "../../Images/redx.png";
import QuestionIcon from "../../Images/questionmark.png";
import { CiDeliveryTruck } from "react-icons/ci";
import { useAppContext } from "../../AppContext";

export function ProductInfo({ product }, { background }) {
  const [isHeartFilled, setIsHeartFilled] = useState(false);
  const [fit, setFit] = useState(false);
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

  let shipDate = Math.floor(Math.random() * 10) + 1;

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

  useEffect(() => {
    if (selectedYear != null && product !== undefined) {
      console.log("product", product);
      //checkFit();
    }
  }, [selectedYear, product]);

  return (
    <div className="pi-description-container">
      <div className="description-header">
        <div className="description-title">
          <div className="name-subcat-title">
            <h1>{product.description} </h1>
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
            <div className="star-count">
              ({product.reviews.length} Customer Reviews)
            </div>
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
      <div className="pi-shipdetails-container">
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
        <div className="pi-ship-container">
          <CiDeliveryTruck size={50}> </CiDeliveryTruck>
          <div className="ships-text">Ships in {shipDate} days</div>
        </div>
      </div>
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
        {CartBut()}
      </div>
    </div>
  );
}

function CartBut() {
  const {
    isOpen: isVisible,
    onClose,
    onOpen,
  } = useDisclosure({ defaultIsOpen: false });

  return isVisible ? (
    <Alert status="success">
      <AlertIcon />
      <Box>
        <AlertTitle>Success!</AlertTitle>
        <AlertDescription>Items added to cart.</AlertDescription>
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
    <Button
      onClick={onOpen}
      w="200px"
      h="80px"
      leftIcon={<Icon as={FaShoppingCart} boxSize={6} />}
      mt={4}
    >
      Add to Cart
    </Button>
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
            This {product.sub_category} fits your <span className = "cap">{selectedYear} {selectedMake}{" "}
            {selectedModel}</span>
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
            This {product.sub_category} does NOT FIT your <span className = "cap">{selectedYear}{" "}
            {selectedMake} {selectedModel}</span> 
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

export default ProductInfo;
