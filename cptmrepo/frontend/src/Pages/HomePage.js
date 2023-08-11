import React, { useState, useEffect, useRef, useCallback } from "react";
import Header from "../Components/NavComponents/Header";
import GarageModel from "../Components/Garage/GarageExpanded";
import GarageBox from "../Components/Garage/GarageBox";
import Banner from "../Components/HomePage/Banner";
import Footer from "../Components/Footer";
import "../Styles/HomePageStyles/HomePage.css";
import createBrowserHistory from "history/createBrowserHistory";
import { ChevronRightIcon, ChevronLeftIcon } from "@chakra-ui/icons";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import PartCardHome from "../Components/ResultsPage/PartCardHome";

import { GET_PROD_BY_ID } from "../GraphQL/queries.js";
import { useLazyQuery } from "@apollo/client";

import "swiper/css";
import "swiper/css/pagination";

function HomePage() {
  const [getProductData, { loading, data: productData }] =
    useLazyQuery(GET_PROD_BY_ID);
  let productIDS = ["16859", "16820", "29731", "65521", "64481"];
  const [productDataArray, setProductDataArray] = useState([]);
  const productCardRef = useRef();
  const history = createBrowserHistory({ forceRefresh: true });

  const handlePartCardClick = (product) => {
    const { unique_id } = product;
    const encodedQuery = encodeURIComponent(unique_id);
    history.push(`/product/${encodedQuery}`);
  };
  //loop through each product id and get the data
  const fetchData = async () => {
    for (const id of productIDS) {
      try {
        const { data: productData } = await getProductData({
          variables: { query: id },
        });
        const isProductDataExist = productDataArray.some(
          (product) =>
            product.getProductByID.parts[0].unique_id ===
            productData.getProductByID.parts[0].unique_id
        );
        if (productData && productData.getProductByID && !isProductDataExist) {
          setProductDataArray((productDataArray) => [
            ...productDataArray,
            productData.getProductByID,
          ]);
        }
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    }
  };

  useEffect(() => {
    if (productIDS.length >= 5) {
      fetchData();
    }
  }, []);

  // useEffect(() => {
  //   console.log("product data", productData);
  //   if (productData) {
  //     // Check if the product already exists in the array before adding
  //     // console.log(
  //     //   "product data id ",
  //     //   productData.getProductByID.parts[0].doc_id
  //     // );
  //     // console.log(
  //     //   "part id",
  //     //   productDataArray[0].getProductByID.getProductByID.parts[0].doc_id
  //     // );
  //     // const productExists = productDataArray.some(
  //     //   (item) =>
  //     //     item.parts[0].doc_id === productData.getProductByID.parts[0].doc_id
  //     // );

  //     setProductDataArray((prevArray) => [
  //       ...prevArray,
  //       productData.getProductByID,
  //     ]);
  //   }
  // }, [productData]);

  useEffect(() => {
    console.log("proddata array", productDataArray);
  }, [productDataArray]);

  const sliderRef = useRef(null);
  const handlePrev = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slidePrev();
  }, []);

  const handleNext = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slideNext();
  }, []);

  return (
    <div className="home-page">
      <div className="header">
        <Header />
      </div>
      <Banner className="banner-home" />

      <div className="home-contents-container">
        <GarageModel className="home-garage-cont" />
      </div>
      <div className="home-featured-products">
        <div className="headerContainer">
          <div className="featured-products-title">POPULAR ITEMS</div>
          <div className="popblock">
            <hr></hr>
          </div>
        </div>
        <div className="SwiperCont">
          <div class="swiper-button-prev-unique">
            <button onClick={handlePrev}>
              <ChevronLeftIcon></ChevronLeftIcon>
            </button>
          </div>
          <Swiper
            ref={sliderRef}
            autoHeight={true}
            navigation={true}
            slidesPerView={4}
            centeredSlides={true}
            spaceBetween={10}
            initialSlide={1}
            grabCursor={true}
            pagination={{
              dynamicBullets: true,
            }}
            modules={[Pagination]}
            className="mySwiper"
          >
            {!loading ? (
              productDataArray.map((product) => {
                return (
                  <SwiperSlide>
                    <PartCardHome
                      key={product.parts[0].unique_id}
                      product={product.parts[0]}
                      onPartCardClick={handlePartCardClick}
                    />
                  </SwiperSlide>
                );
              })
            ) : (
              <div>Loading...</div>
            )}
          </Swiper>

          <div class="swiper-button-next-unique">
            <button onClick={handleNext}>
              <ChevronRightIcon></ChevronRightIcon>
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default HomePage;
