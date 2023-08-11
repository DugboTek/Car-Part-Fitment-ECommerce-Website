//Bella White
import React, { useEffect, useRef, useState } from "react";
import { Box } from "@chakra-ui/react";
import { SimpleGrid, Skeleton } from "@chakra-ui/react";
import { Image } from "@chakra-ui/react";
import { useDisclosure, Fade } from "@chakra-ui/react";
import ResultBox from "./ResultBox";
import PartCard from "./PartCard";
import { GET_PRODUCTS } from "../../GraphQL/queries.js";
import { useLazyQuery } from "@apollo/client";
import "../../Styles/ResultsPageStyles/ResultsPage.css";
import createBrowserHistory from "history/createBrowserHistory";
export function RGrid({ searchData, isLoading }) {
  const [products, setProducts] = useState([]);
  const [loadingState, setLoadingState] = useState(true);
  const [getProduct, { loading, error, data }] = useLazyQuery(GET_PRODUCTS);

  const productCardRef = useRef();

  const history = createBrowserHistory({ forceRefresh: true });
  const handlePartCardClick = (product) => {
    console.log("producifo", product);
    const { unique_id } = product;
    console.log(unique_id);
    const encodedQuery = encodeURIComponent(unique_id);
    //console.log("searching for", encodedQuery);
    history.push(`/product/${encodedQuery}`);
  };

  useEffect(() => {
    // Handle the query result whenever 'data' changes
    if (data && data.getProducts) {
      // console.log(data.getProducts)
      setProducts(data.getProducts);
    }
  }, [data]);

  

  useEffect(() => {
    // Handle the query result whenever 'data' changes
    if (searchData) {
      console.log("searchData", searchData);
      setProducts([...searchData]);
    }
  }, [searchData]);

  useEffect(() => {
    //console log products when it changes
    console.log("products", products);
  }, [products]);

  useEffect(() => {
    //handle when isLoading Changes
    if (isLoading) {
      setLoadingState(isLoading);
    } else {
      setLoadingState(isLoading);
    }
  }, [isLoading]);

  const property = {
    bgCol: "blue",
    cellHeight: "450px",
    cellWidth: "350px",
    numCells: 20,
    spacing: "6.8em",
  };
  return (
    <>
      {isLoading ? (
        // Show the skeleton grid when isLoading is true
        <SkeletonGrid products={products} />
      ) : (
        // Show the actual results when isLoading is false
        <div className="results-grid-cont">
          {products.map((p) => (
            <PartCard
              product={p}
              key={p.unique_id}
              ref={productCardRef}
              onPartCardClick={handlePartCardClick}
            />
          ))}
        </div>
      )}
    </>
  );
}

const SkeletonGrid = ({ products }) => {
  return (
    <div className="results-grid-cont">
      {Array.from({ length: 20 }).map((_, index) => (
        <Box
          key={index}
          p="10px"
          transition="opacity 0.5s ease" // Add a transition to smooth the animation
          opacity={0.5} // Reduce opacity when loading is true
        >
          <Skeleton
            w={350}
            h={450}
            className="skeleton-image" // Apply the CSS class for the image placeholder
            mb="10px"
          />
        </Box>
      ))}
      <div className="hiddenproducts">
        {products.map((p) => (
          <PartCard product={p} key={p.id} />
        ))}
      </div>
    </div>
  );
};

export default RGrid;
