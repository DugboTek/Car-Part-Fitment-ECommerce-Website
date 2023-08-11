import React, { useEffect, useRef, useState } from "react";
import Header from "../NavComponents/Header";
import Garage from "../Garage/Garage";
import Facets from "../ResultsPage/FacetsBox";
import SortBy from "./SortBy";
import deadCar from "../../Images/deadcar.png";
import { useParams } from "react-router-dom";
import "../../Styles/ResultsPageStyles/ResultsPage.css";
import RGrid from "./RGrid";
import { SEARCH_RESULTS } from "../../GraphQL/queries.js";
import { useLazyQuery } from "@apollo/client";
import { Skeleton, Fade } from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import Footer from "../Footer";
import { useAppContext } from "../../AppContext.js";
import { hasSelectionSupport } from "@testing-library/user-event/dist/utils";

let searchVal = "All oem parts";
function ResultsPage() {
  let { selectedYear, selectedMake, selectedModel } = useAppContext();

  const [searchResults, setSearchResults] = useState([]);
  const [facets, setFacets] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [noResults, setNoResults] = useState(false);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [initFilter, setinitFilter] = useState(false);

  const [getSearchResults, { data: resultData, error, loading }] = useLazyQuery(
    SEARCH_RESULTS,
    {
      onError: (error) => {
        console.log("An error occurred while fetching search results:", error);
      },
    }
  );
  const { query } = useParams(); // Get the search term from the URL
  if (selectedYear == null) {
    selectedYear = sessionStorage.getItem("year");
    selectedMake = sessionStorage.getItem("make");
    selectedModel = sessionStorage.getItem("model");
  }
  const [facetSelection, setFacetSelection] = useState({
    years_accepted: parseInt(selectedYear),
    make: selectedMake,
    model: selectedModel,
    category: null,
    sub_category: null,
    location: null,
  });

  useEffect(() => {
    if (!initFilter) {
      if (selectedYear === "null") {
        setFacetSelection({
          years_accepted: null,
          make: null,
          model: null,
          category: null,
          sub_category: null,
          location: null,
        });
      }
      setinitFilter(true);
    }
  }, []);

  const lastFacetSelection = useRef(facetSelection);

  const handleSearch = (searchTerm, page, selectedFacets = null) => {
    console.log("making query");
    console.log("selectedfacet", selectedFacets);

    searchVal = searchTerm; // Update searchVal with the search term
    const variables = selectedFacets
      ? {
          query: searchTerm,
          yearFacet: true,
          makeFacet: true,
          modelFacet: true,
          categoryFacet: true,
          subcategoryFacet: true,
          locationFacet: true,
          page: page,
          facetSelection: selectedFacets,
        }
      : {
          query: searchTerm,
          yearFacet: true,
          makeFacet: true,
          modelFacet: true,
          categoryFacet: true,
          subcategoryFacet: true,
          locationFacet: true,
          page: page,
          facetSelection: selectedFacets,
        };

    // console.log("variables", variables);
    getSearchResults({
      variables,
    });
  };

  const handleCheckboxChange = (category, value, isChecked) => {
    if (category === "years_accepted") {
      value = isChecked ? parseInt(value) : null;
    }
    setFacetSelection((prevFacetSelection) => ({
      ...prevFacetSelection,
      [category]: isChecked ? value : null,
    }));
  };

  const clearFilter = (category) => {
    if (category === "years_accepted") {
      setFacetSelection((prevFacetSelection) => ({
        ...prevFacetSelection,
        [category]: null,
      }));
    } else {
      setFacetSelection((prevFacetSelection) => ({
        ...prevFacetSelection,
        [category]: null,
      }));
    }
  };

  useEffect(() => {
    // If query and currentPage are not null, and facetSelection has changed
    if (
      query &&
      currentPage &&
      JSON.stringify(facetSelection) !==
        JSON.stringify(lastFacetSelection.current)
    ) {
      console.log("facet selection changed");

      lastFacetSelection.current = facetSelection;
      handleSearch(query, currentPage, facetSelection);
    }
  }, [query, currentPage, facetSelection]);

  useEffect(() => {
    if (searchResults.length > 0) {
      console.log("search results", searchResults.length);
      setNoResults(false);
    } else {
      if (dataLoaded && !loading) {
        console.log("no search results");
        setNoResults(true);
      }
    }
  }, [searchResults, loading, dataLoaded]);

  function loadMore() {
    setCurrentPage(currentPage + 1);
    handleSearch(query, currentPage, facetSelection);
  }

  function skeletonFacets() {
    //  console.log("no facets");
    return (
      <>
        <div className="facets">
          <div className="cat-list" key="price">
            <h1>
              <Skeleton w="50px" h="20px" />
            </h1>
            <div className="facet-list">
              <Skeleton w="250px" h="16px" mb="2" />
              <Skeleton w="20px" h="5px" mb="2" />
            </div>
          </div>
        </div>
        <div className="facets">
          {[...Array(5)].map((_, index) => (
            <div className="cat-list" key={index}>
              <h1>
                <Skeleton w="100px" h="20px" />
              </h1>
              <div className="facet-list">
                <Skeleton w="100px" h="16px" mb="2" />
                <Skeleton w="100px" h="16px" mb="2" />
                <Skeleton w="100px" h="16px" mb="2" />
                <Skeleton w="100px" h="16px" mb="2" />
                <Skeleton w="100px" h="16px" mb="2" />
                <Skeleton w="100px" h="16px" mb="2" />
              </div>
            </div>
          ))}
        </div>
      </>
    );
  }
  React.useEffect(() => {
    if (query) {
      console.log("somthing changed...", facetSelection);
      handleSearch(query, currentPage, facetSelection);
    }
  }, [query]);

  React.useEffect(() => {
    if (resultData) {
      console.log("results data", resultData);
      setSearchResults(resultData.searchPartialParts.parts);
      // Assuming facets are returned as an object with different arrays for each facet category
      const facetsData = resultData.searchPartialParts.facets;
      // Update the facets state with the retrieved data

      setFacets(facetsData);
      setDataLoaded(true);
    }
  }, [resultData]);

  const property = {
    bgCol: "blue",
    cellHeight: "250px",
    cellWidth: "200px",
  };

  // NEED TO PASS IN THE SEARCH VALUE HERE
  return (
    <div className="results-page">
      <div className="header">
        <Header onSearch={handleSearch} />
      </div>
      <div className="results-container">
        <div className="results-left">
          <div className="garage-cont">
            {/* <Garage/> */}
            {/* <h2>GARAGE</h2> */}
          </div>
          <>
            <Fade in={!loading} transitionDuration={5000}>
              <div className="filter-cont">
                {!noResults ? (
                  <>
                    <h2>Filter by:</h2>
                    <FiltersArea
                      facetSelection={facetSelection}
                      clearFilter={clearFilter}
                    />
                  </>
                ) : null}
              </div>
              <Facets
                facets={facets}
                selectedFacets={facets}
                handleCheckboxChange={handleCheckboxChange}
              />
            </Fade>
            <Fade in={loading} out={!loading} transitionDuration={5000}>
              {skeletonFacets()}
            </Fade>
          </>
        </div>
        <div className="results-right">
          <div className="filters-container">
            <div className="filterstack">
              <h1>
                {noResults ? (
                  selectedYear === "null" ? (
                    `No results for: "${searchVal}"`
                  ) : (
                    <div className="badabing">
                      No matching "{searchVal}" for your
                      <div className="yearinfo">
                        {selectedYear} {selectedMake} {selectedModel}
                      </div>
                    </div>
                  )
                ) : searchResults.length > 0 ? (
                  `${searchResults[0].num_hits} results for "${
                    searchVal.charAt(0).toUpperCase() + searchVal.slice(1)
                  }"`
                ) : (
                  "Loading results..."
                )}
                {noResults && selectedYear !== "null" && <br />}
              </h1>
              <h2>
                {noResults &&
                  selectedYear !== "null" &&
                  "Try changing the car in your garage or use a different search term to see more results."}
              </h2>
            </div>

            <div className="sort-container">
              {!noResults ? <SortBy /> : null}
            </div>
          </div>
          {!noResults ? (
            <RGrid searchData={searchResults} isLoading={loading} />
          ) : (
            <div className="no-results-container">
              <img src={deadCar} style={{ width: "200px", height: "200px" }} />
            </div>
          )}

          <div className="load-more-container">
            {!noResults ? (
              <button className="button-3" onClick={loadMore}>
                Load More
              </button>
            ) : null}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

const FiltersArea = ({ facetSelection, clearFilter }) => {
  const selectedFacets = Object.entries(facetSelection).filter(
    ([key, value]) => value !== null
  );

  return (
    <div className="filters-area">
      {selectedFacets.map(([key, value]) => {
        // Check if the value is not an empty array
        if (Array.isArray(value) && value.length === 0) {
          return null; // Skip rendering this element
        }

        return (
          <div key={key} className="selected-facet-box">
            <div className="selected-facet-name">{value} </div>
            <span className="clear-filter" onClick={() => clearFilter(key)}>
              <CloseIcon />
            </span>
          </div>
        );
      })}
    </div>
  );
};

//  <h1>{`Searching for ${query}`}</h1>
export default ResultsPage;
