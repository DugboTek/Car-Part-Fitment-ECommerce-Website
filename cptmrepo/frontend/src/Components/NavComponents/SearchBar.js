import React, { useState, useEffect, useRef } from "react";
import {
  Input,
  InputGroup,
  //   InputLeftElement,
  Button,
  Text,
} from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
import { convertLink } from "../util/s3TOazureblob.js";

import createBrowserHistory from "history/createBrowserHistory";

import { SearchIcon } from "@chakra-ui/icons";
import { BsArrowReturnRight } from "react-icons/bs";
import { AiOutlineArrowRight } from "react-icons/ai";
import { BiSearch } from "react-icons/bi";
// import Autosuggest from 'react-autosuggest';
import { Link } from "react-router-dom";

import { SEARCH_SUGGESTIONS, GET_PROD_BY_ID } from "../../GraphQL/queries.js";
import { useLazyQuery } from "@apollo/client";
import debounce from "lodash.debounce";

//import "../../Styles/main.css";
import "../../Styles/NavStyles/SearchBar.css";
import { useAppContext } from "../../AppContext.js";
function SearchBar({ onSearch }) {
  const history = createBrowserHistory({ forceRefresh: true });

  let { selectedYear, selectedMake, selectedModel } = useAppContext();
  const [imageurl, setImageurl] = useState("");
  const DEBOUNCE_DELAY = 100; //MS
  const [searchTerm, setSearchTerm] = React.useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [getSuggestions, { data, loading }] = useLazyQuery(SEARCH_SUGGESTIONS);
  //const [getConvertedID, { data: convertedID }] = useLazyQuery(CONVERT_ID);
  const [getProductID, { data: productID }] = useLazyQuery(GET_PROD_BY_ID);
  const [getProductData, { data: productData }] = useLazyQuery(GET_PROD_BY_ID);

  const [hoveredSuggestion, setHoveredSuggestion] = useState(null);

  const [combinedProductData, setCombinedProductData] = useState([]);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);

  const [showSuggestions, setShowSuggestions] = useState(true);
  const suggestionsBoxRef = useRef(null);

  if (selectedYear == null) {
    selectedYear = sessionStorage.getItem("year");
    selectedMake = sessionStorage.getItem("make");
    selectedModel = sessionStorage.getItem("model");
  }

  useEffect(() => {
    // console.log("selectedYear", selectedYear);
  }, [selectedYear]);

  // Function to close the suggestions
  const closeSuggestions = () => {
    setShowSuggestions(false);
  };

  // Event listener to detect clicks outside the suggestions box
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        suggestionsBoxRef.current &&
        !suggestionsBoxRef.current.contains(event.target) &&
        !event.target.classList.contains("search-bar-input") // Add this check
      ) {
        closeSuggestions();
      } else if (
        event.target.classList.contains("search-bar-input") &&
        searchTerm === ""
      ) {
        closeSuggestions();
      }
    };

    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  const debouncedFn = debounce((term) => {
    setDebouncedSearchTerm(term);
  }, DEBOUNCE_DELAY);

  useEffect(() => {
    debouncedFn(searchTerm);
    return () => {
      debouncedFn.cancel();
    };
  }, [searchTerm]);

  useEffect(() => {
    // When debouncedSearchTerm changes, fetch suggestions
    if (debouncedSearchTerm) {
      getSuggestions({
        variables: { searchTerm: debouncedSearchTerm },
      });
    }
  }, [debouncedSearchTerm, getSuggestions]);

  // useEffect(() => {
  //   if (data) {
  //     console.log("Suggestions:", data.searchSuggestions);
  //   }
  //   getSuggestionData();
  // }, [data]);

  const handleInputChange = (event) => {
    const input = event.target.value;
    setSearchTerm(input);
    if (input.trim() === "") {
      setShowSuggestions(false);
    } else {
      setShowSuggestions(true);
    }
  };

  useEffect(() => {
    setHoveredSuggestion(null);
    setCombinedProductData([]);
    // Reset combinedProductData to an empty array
  }, [searchTerm]);

  const handleSuggestionClick = (suggestion) => {
    console.log("clicked", suggestion);
    setSearchTerm(suggestion);
    generateSuggestionClickSearch(suggestion);
  };

  const handleInputFocus = () => {
    setShowSuggestions(true);
    console.log("focus");
  };

  const handleInputKeyDown = (event) => {
    if (event.key === "Enter") {
      // When the "Enter" key is pressed, perform the search
      generateSearch();
    }
  };

  const generateSearch = () => {
    const encodedQuery = encodeURIComponent(searchTerm);
    console.log("searching for", encodedQuery);
    history.push(`/Search/${encodedQuery}`);
  };

  const convertID = (id) => {
    //convert id to string
    console.log("id", id);
    const idString = id.toString();
    getProductID({ variables: { query: idString } });
  };

  //useEffect for when the convertedID changes
  useEffect(() => {
    if (productID) {
      console.log("convertedID", productID.getProductByID);
      generateSuggestionClickSearch(
        productID.getProductByID.parts[0].unique_id
      );
    }
  }, [productID]);

  const generateSuggestionClickSearch = (term) => {
    const encodedQuery = encodeURIComponent(term);
    console.log("searching for", encodedQuery);
    history.push(`/product/${encodedQuery}`);
  };

  // useEffect(() => {
  //   if (productData && productData.getProductByID) {
  //     setCombinedProductData((prevData) => [
  //       ...prevData,
  //       productData.getProductByID,
  //     ]);
  //   }
  // }, [productData]);

  useEffect(() => {
    if (productData && productData.getProductByID) {
      console.log("combinedProductData", combinedProductData);
    }
  }, [combinedProductData]);

  //async getSuggestionsData function
  // Function to extract suggestion IDs from the data and return an array of IDs
  const getSuggestionsID = (data) => {
    const suggestionData = data?.searchSuggestions;
    if (!suggestionData) return [];

    // Extract the IDs from the suggestions and merge them into a single array
    const ids = [...suggestionData.description.map((item) => item.id)];
    console.log(ids);
    return ids;
  };

  const handleHover = (suggestionId) => {
    // combinedProductData.forEach((item) => {
    //   console.log("item", item);
    // });

    // console.log(combinedProductData);
    // console.log(combinedProductData[0].parts[0]?.unique_id);
    // console.log(combinedProductData[0].item.parts[0]?.unique_id);
    // Find the product info from combinedProductData array for the hovered suggestionId
    const hoveredProduct = combinedProductData.find(
      (item) => item.parts[0]?.doc_id === suggestionId
    );
    // // Set the hoveredSuggestion state to the product info for displaying it on hover
    setHoveredSuggestion(hoveredProduct ? hoveredProduct.parts[0] : null);
    let updatedimage = convertLink(hoveredProduct.parts[0]?.image_url);
    setImageurl(updatedimage);
  };

  useEffect(() => {
    if (hoveredSuggestion) {
      console.log("hoveredSuggestion", hoveredSuggestion);
    }
  }, [hoveredSuggestion]);

  //Get suggestions individual parts data
  useEffect(() => {
    const fetchData = async () => {
      if (data) {
        const suggestionIds = getSuggestionsID(data);
        console.log(suggestionIds);
        for (const id of suggestionIds) {
          try {
            const { data: productData } = await getProductData({
              variables: { query: id.toString() },
            });

            if (productData && productData.getProductByID) {
              console.log("productData", productData.getProductByID);
              const filteredProduct = filterProductData(
                productData.getProductByID
              );
              if (filteredProduct !== null) {
                setCombinedProductData((prevData) => [
                  ...prevData,
                  filteredProduct,
                ]);
              }
            }
          } catch (error) {
            console.error("Error fetching product data:", error);
          }
        }
      }
    };

    fetchData();
  }, [data]);

  const filterProductData = (prodData) => {
    // console.log("prodData");
    // console.log(prodData);
    const prodYears = prodData.parts[0].years_accepted || [];
    const prodMake = prodData.parts[0].make || "";
    const prodModel = prodData.parts[0].model || "";
    // console.log("partInfo:", prodYears, prodMake, prodModel);
    // console.log("SelectedInfo:", selectedYear, selectedMake, selectedModel);
    if (selectedYear === "null" || selectedYear === null) {
      return prodData;
    }

    let intYear = parseInt(selectedYear);
    const yearMatched = prodYears.includes(intYear);
    const makeMatched = prodMake === selectedMake;
    const modelMatched = prodModel === selectedModel;

    console.log("Info match?:", yearMatched && makeMatched && modelMatched);

    if (yearMatched && makeMatched && modelMatched) {
      return prodData;
    } else {
      return null;
    }
  };

  //const hasSuggestions = data && data.searchSuggestions;
  const hasFilteredSuggestions = combinedProductData.length > 0;

  return (
    <InputGroup className="search-bar">
      <div className="complete-container">
        <div className="search-container">
          <div className="search-area">
            <Input
              value={searchTerm}
              onChange={handleInputChange} //check if the key is enter within this function
              id="search-input"
              type="text"
              onKeyDown={handleInputKeyDown}
              onFocus={handleInputFocus}
              placeholder="Search by product name, category, brand, or part number. "
              className="search-bar-input"
            />
            <div className="search-icon">
              {/* <SearchIcon color="black" /> */}
            </div>
          </div>

          {loading}
          <div className="suggestions-box" ref={suggestionsBoxRef}>
            {showSuggestions &&
              hasFilteredSuggestions &&
              searchTerm.trim() !== "" && (
                <div className="suggestions">
                  <ul className="suggestions-items">
                    {combinedProductData.length > 0 && (
                      <>
                        <div className="suggestion-list">
                          {combinedProductData.map((product) => (
                            <li key={product.parts[0].description}>
                              <BiSearch></BiSearch>
                              <span
                                onClick={() =>
                                  generateSuggestionClickSearch(
                                    product.parts[0].unique_id
                                  )
                                }
                                onMouseEnter={() =>
                                  handleHover(product.parts[0].doc_id)
                                }
                              >
                                {product.parts[0].description}
                              </span>
                            </li>
                          ))}
                        </div>
                      </>
                    )}
                    {/* {showSuggestions && hasSuggestions && searchTerm.trim() !== "" && (
              <div className="suggestions">
                <ul className="suggestions-items">
                  {data.searchSuggestions.description.length > 0 && (
                    <>
                      <div className="suggestion-list">
                        {data.searchSuggestions.description.map(
                          (suggestion) => (
                            <li key={suggestion.suggestion}>
                              <BiSearch></BiSearch>
                              <span
                                onClick={() => convertID(suggestion.id)}
                                onMouseEnter={() => handleHover(suggestion.id)}
                              >
                                {suggestion.suggestion}
                              </span>
                            </li>
                          )
                        )}
                      </div>
                    </>
                  )} */}
                    {/* {data.searchSuggestions.make_text.length > 0 && (
                    <div className="suggestion-area">
                      <div className="suggestion-list">
                        {data.searchSuggestions.make_text.map((suggestion) => (
                          <li key={suggestion.suggestion}>
                            <span
                              onClick={() =>
                                handleSuggestionClick(suggestion.suggestion)
                              }
                            >
                              {suggestion.suggestion}
                            </span>
                          </li>
                        ))}
                      </div>
                      <div className="suggestion-category">
                        <div className="suggestion-arrow">
                          <BsArrowReturnRight size={20} color="black" />
                        </div>
                        <li id="header-cat">in Makes</li>
                      </div>
                    </div>
                  )}
                  {data.searchSuggestions.category_text.length > 0 && (
                    <div className="suggestion-area">
                      <div className="suggestion-list">
                        {data.searchSuggestions.category_text.map(
                          (suggestion) => (
                            <li key={suggestion.suggestion}>
                              <span
                                onClick={() =>
                                  handleSuggestionClick(suggestion.suggestion)
                                }
                              >
                                {suggestion.suggestion}
                              </span>
                            </li>
                          )
                        )}
                      </div>
                      <div className="suggestion-category">
                        <div className="suggestion-arrow">
                          <BsArrowReturnRight size={20} color="black" />
                        </div>
                        <li id="header-cat">in Categories</li>
                      </div>
                    </div>
                  )}
                  {data.searchSuggestions.model_text.length > 0 && (
                    <div className="suggestion-area">
                      <div className="suggestion-list">
                        {data.searchSuggestions.model_text.map((suggestion) => (
                          <li key={suggestion.suggestion}>
                            <span
                              onClick={() =>
                                handleSuggestionClick(suggestion.suggestion)
                              }
                            >
                              {suggestion.suggestion}
                            </span>
                          </li>
                        ))}
                      </div>
                      <div className="suggestion-category">
                        <div className="suggestion-arrow">
                          <BsArrowReturnRight size={20} color="black" />
                        </div>
                        <li id="header-cat">in Models</li>
                      </div>
                    </div>
                  )}
                  {data.searchSuggestions.model_text.length > 0 && (
                    <div className="suggestion-area">
                      <div className="suggestion-list">
                        {data.searchSuggestions.model_text.map((suggestion) => (
                          <li key={suggestion.suggestion}>
                            <span
                              onClick={() =>
                                handleSuggestionClick(suggestion.suggestion)
                              }
                            >
                              {suggestion.suggestion}
                            </span>
                          </li>
                        ))}
                      </div>
                      <div className="suggestion-category">
                        <div className="suggestion-arrow">
                          <BsArrowReturnRight size={20} color="black" />
                        </div>
                        <li id="header-cat">in Models</li>
                      </div>
                    </div>
                  )}
                  {data.searchSuggestions.sub_category_text.length > 0 && (
                    <div className="suggestion-area">
                      <div className="suggestion-list">
                        {data.searchSuggestions.sub_category_text.map(
                          (suggestion) => (
                            <li key={suggestion.suggestion}>
                              {suggestion.suggestion}
                            </li>
                          )
                        )}
                      </div>
                      <div className="suggestion-category">
                        <div className="suggestion-arrow">
                          <BsArrowReturnRight size={20} color="black" />
                        </div>
                        <li id="header-cat">in Sub Categories</li>
                      </div>
                    </div>
                  )} */}
                  </ul>
                  <div></div>
                  {hoveredSuggestion && (
                    <div className="product-info-on-hover">
                      <div className="hover-info">
                        <div className="hover-title">
                          <h1>{hoveredSuggestion.description}</h1>
                          <h2>{hoveredSuggestion.sub_category}</h2>
                        </div>
                        <div className="hover-buttons">
                          <Button
                            className="hover-btn"
                            id="but"
                            onClick={() =>
                              generateSuggestionClickSearch(
                                hoveredSuggestion.unique_id
                              )
                            }
                          >
                            See Part
                            <AiOutlineArrowRight
                              className="arrowright"
                              size={15}
                              color="black"
                            />
                          </Button>
                        </div>
                      </div>
                      <div className="hover-image">
                        <img
                          src={imageurl}
                          alt={hoveredSuggestion.description}
                        />
                      </div>
                    </div>
                  )}
                </div>
              )}
          </div>
        </div>
        <div className="btn-container">
          <Button
            onClick={generateSearch}
            className="search-btn"
            color="white"
            bg="#004E97"
          >
            {" "}
            Search
          </Button>
        </div>
        <div className="srch-dropdown"></div>
      </div>
    </InputGroup>
  );
}

export default SearchBar;
