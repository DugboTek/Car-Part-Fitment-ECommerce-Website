import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../Components/NavComponents/Header";
import Footer from "../Components/Footer";
import Specs from "../Components/ProductPage/ProductSpecs";
import Reviews from "../Components/ProductPage/Reviews";
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";
import "../Styles/HomePageStyles/HomePage.css";
// import ItemSpecs from '../Components/QuickView/ProductSpecsBox';
import { useLocation } from "react-router-dom";
import { GET_PRODUCTS_BY_ID } from "../GraphQL/queries";
import { useLazyQuery } from "@apollo/client";
import "../Styles/ProductPage/ProductSpecsPage.css";

// it would be passed a product when clicked on from the search results page
function ProductSpecsPage() {
  const [product, setProduct] = useState(null);
  const location = useLocation();
  const { query } = useParams(); // Get the search term from the URL
  const uniqueId = parseInt(query);
  const [getProduct, { loading, error, data }] =
    useLazyQuery(GET_PRODUCTS_BY_ID);
  useEffect(() => {
    getProduct({
      variables: {
        uniqueId: uniqueId,
      },
    });
  }, []);

  useEffect(() => {
    if (data && data.fullProductView) {
      setProduct(data.fullProductView);
    }
  }, [data]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error occurred while fetching product data.</div>;
  }

  return (
    <div>
      <div className="header">
        <Header />
      </div>
      <div className="specspage-sections">
        <div className="ps-contents-container">
          {product ? <Specs product={product} /> : <div> Loading...</div>}
        </div>

        <div className="reviews-container">
          {product ? (
            <Reviews reviews={product.reviews} />
          ) : (
            <div> Loading...</div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ProductSpecsPage;
