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
import "../../Styles/ResultsPageStyles/PartCardHome.css";
import { useLazyQuery } from "@apollo/client";
import { GET_PROD_BY_ID } from "../../GraphQL/queries.js";
import { convertLink } from "../util/s3TOazureblob.js";

export default function PartCardHome({ product, onPartCardClick }) {
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
      event.target.id !== "product-card-home-button"
    ) {
      onPartCardClick(product);
    }
  };

  return (
    <div
      ref={productCardRef}
      onClick={handlePartCardClick}
      className="product-card-home"
    >
      <div className="product-card-home-image">
        <img src={image} alt="No part image found"></img>
      </div>
      <div className="product-card-home-info">
        <div className="product-card-home-name">
          <h1>{name}</h1>
        </div>
        <div className="product-card-home-price">
          <h3>${price}</h3>
        </div>
        <div className="product-card-home-button">
          <button>Add To Cart</button>
        </div>
      </div>
    </div>
  );
}
