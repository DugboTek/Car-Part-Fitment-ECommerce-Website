import React, { useState } from "react";
import {
  Box,
  Stack,
  Checkbox,
  CheckboxGroup,
  RangeSlider,
  RangeSliderTrack,
  RangeSliderFilledTrack,
  RangeSliderThumb,
} from "@chakra-ui/react";

import _ from "lodash";

import { BiUpArrowAlt, BiDownArrowAlt } from "react-icons/bi";
import { MdOutlineAttachMoney, MdGraphicEq } from "react-icons/md";
import "../../Styles/ResultsPageStyles/FacetsBox.css";

const ITEMS_TO_SHOW = 5; // Number of items to show initially

// Utility function to format the category names
function formatCategoryName(category) {
  switch (category) {
    case "years_accepted":
      return "Years";
    case "sub_category":
      return "Sub-Category";
    default:
      return category.charAt(0).toUpperCase() + category.slice(1);
  }
}
function FacetsBox({ facets, selectedFacets, handleCheckboxChange }) {
  const [itemsToShow, setItemsToShow] = useState({});
  // Function to handle checkbox change and update selected facets
  const handleCheckboxChangeInternal = (category, value, isChecked) => {
    handleCheckboxChange(category, value, isChecked);
  };

  // Exclude __typename property from the facets object
  const filteredFacets = Object.entries(facets).reduce((acc, [key, value]) => {
    if (key !== "__typename") {
      acc[key] = value;
      // Set initial itemsToShow state for each facet category
      if (!itemsToShow[key]) {
        setItemsToShow((prevState) => ({ ...prevState, [key]: ITEMS_TO_SHOW }));
      }
      if (key === "years_accepted") {
        acc[key] = _.orderBy(value, ["value"], ["desc"]);
      }
    }
    return acc;
  }, {});

  //log props facets when they come in

  const handleShowMore = (category) => {
    setItemsToShow((prevState) => ({
      ...prevState,
      [category]: prevState[category] + ITEMS_TO_SHOW,
    }));
  };

  const handleShowLess = (category) => {
    setItemsToShow((prevState) => ({
      ...prevState,
      [category]: ITEMS_TO_SHOW,
    }));
  };

  return (
    <div className="facets">
      {Object.entries(filteredFacets).map(([category, facetData]) => {
        const showMoreButton = facetData.length > itemsToShow[category];
        const isPriceCategory = category === "price";
        if (facetData.length <= 1) {
          return null;
        }
        return (
          <div className="cat-list" key={category}>
            <h1>{formatCategoryName(category)}</h1>
            {isPriceCategory ? (
              <div className="facet-list">
                <PriceSlider />
              </div>
            ) : (
              makeList(
                facetData.slice(0, itemsToShow[category]),
                category,
                handleCheckboxChangeInternal
              )
            )}
            {!isPriceCategory && (
              <div className="show-more-less">
                {showMoreButton && (
                  <>
                    <button onClick={() => handleShowMore(category)}>
                      Show More
                    </button>
                    <div className="arrow">
                      <BiDownArrowAlt size={20} color="black" />
                    </div>
                  </>
                )}

                {!showMoreButton && itemsToShow[category] > ITEMS_TO_SHOW && (
                  <>
                    <button onClick={() => handleShowLess(category)}>
                      Show Less
                    </button>
                    <div className="arrow">
                      <BiUpArrowAlt size={20} color="black" />
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );

  function makeList(facetData, category) {
    // Check if the category is "price" and render the price slider
    if (category === "price") {
      console.log("price slider");
      return <div className="facet-list">{<PriceSlider />}</div>;
    }

    if (category === "years_accepted") {
      return (
        <Stack className="facet-list" direction="column">
          {facetData.map((facetInfo) => {
            const { value, count } = facetInfo;
            return (
              <Checkbox
                className="checkbox-area"
                key={value}
                onChange={(e) =>
                  handleCheckboxChange(category, value, e.target.checked)
                }
                isChecked={selectedFacets[category] === value}
              >
                {value} ({count})
              </Checkbox>
            );
          })}
        </Stack>
      );
    }

    return (
      <Stack className="facet-list" direction="column">
        {facetData.map((facetInfo) => {
          const { value, count } = facetInfo;
          return (
            <Checkbox
              className="checkbox-area"
              key={value}
              onChange={(e) =>
                handleCheckboxChange(category, value, e.target.checked)
              }
              isChecked={selectedFacets[category] === value}
            >
              {value} ({count})
            </Checkbox>
          );
        })}
      </Stack>
    );
  }
}

const PriceSlider = () => {
  const [sliderValue, setSliderValue] = useState([1, 500]);
  const [showTooltip, setShowTooltip] = useState(false);

  const handleSliderChange = (newValue) => {
    setSliderValue(newValue);
  };

  const handleSliderChangeEnd = (finalValue) => {
    console.log("Final Value:", finalValue);
  };

  return (
    <div>
      <RangeSlider
        aria-label={["min", "max"]}
        defaultValue={[10, 500]}
        min={0}
        max={1000}
        onChange={handleSliderChange}
        onChangeEnd={handleSliderChangeEnd}
      >
        <RangeSliderTrack>
          <RangeSliderFilledTrack />
        </RangeSliderTrack>
        <RangeSliderThumb index={0} className="my-range-slider-thumb">
          <Box color="#004e97" as={MdOutlineAttachMoney} />
        </RangeSliderThumb>
        <RangeSliderThumb index={1} className="my-range-slider-thumb">
          <Box color="#004e97" as={MdOutlineAttachMoney} />
        </RangeSliderThumb>
      </RangeSlider>
      <div>{`$${sliderValue[0]} - $${sliderValue[1]}`}</div>
    </div>
  );
};

export default FacetsBox;
