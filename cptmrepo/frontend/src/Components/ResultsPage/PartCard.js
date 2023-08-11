import React, { useEffect, useRef, useState } from "react";
import { useDisclosure } from "@chakra-ui/react";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import ItemSpecs from "../QuickView/ItemSpecs.js";
import "../../Styles/ResultsPageStyles/PartCard.css";
import { useLazyQuery } from "@apollo/client";
import { GET_PROD_BY_ID } from "../../GraphQL/queries.js";
import {convertLink} from "../util/s3TOazureblob.js";

export default function PartCard({ product, onPartCardClick }) {

  const image = convertLink(product.image_url);
  const subcat = product.sub_category;
  const name = product.description;
  const price = product.price;
  const oem = product.oem;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [getProductID, { data: productID }] = useLazyQuery(GET_PROD_BY_ID);
  const productCardRef = useRef();

  const convertID = (id) => {
    //convert id to string
    console.log("id", id);
    const idString = id.toString();
    getProductID({ variables: { query: idString } });
  };

  //useEffect for when the convertedID changes
  // useEffect(() => {
  //   if (productID) {
  //     console.log("convertedID", productID.getProductByID);
  //     generateSuggestionClickSearch(
  //       productID.getProductByID.parts[0].unique_id
  //     );
  //   }
  // }, [productID]);

  const handlePartCardClick = (event) => {
    // Check if the clicked element has the id "quick-view-btn"
    // If not, proceed with passing the product data to the parent component
    if (
      event.target.id !== "quick-view-btn" &&
      event.target.id !== "product-card-button"
    ) {
      onPartCardClick(product);
    }
  };

  return (
    <div
      ref={productCardRef}
      onClick={handlePartCardClick}
      className="product-card"
    >
      <div className="product-card-image">
        <img src={image} alt="No part image found"></img>
        <div className="overlay"></div>
        <Button id="quick-view-btn" onClick={onOpen}>
          Quick View
        </Button>
        <Modal size={"xl"} isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent maxW="40vw">
            <ModalCloseButton />
            <ModalBody>
              <ItemSpecs product={product}></ItemSpecs>
            </ModalBody>
          </ModalContent>
        </Modal>
      </div>
      <div className="product-card-info">
        <div className="product-card-name">
          <h1>{name}</h1>
          <h3>{subcat}</h3>
          <p>OEM: {oem}</p>
        </div>
        <div className="product-card-price">
          <h3>${price}</h3>
        </div>
        <div className="product-card-button">
          <button>Add To Cart</button>
        </div>
      </div>
    </div>
  );
}
