import React, { useState, useEffect } from "react";
import { useLazyQuery } from "@apollo/client";
import { useAppContext } from "../../AppContext";
import "../../Styles/NavStyles/DropdownStyling.css";
import { useHistory } from "react-router-dom";

import { subscribe } from "graphql";
import { ALL_CATEGORIES, SELECTED_CATEGORIES } from "../../GraphQL/queries.js";
import "../../Styles/NavStyles/DropdownStyling.css";

function Capitalize(word) {
  if (word && word !== "") {
    let final_word = word[0].toUpperCase();
    final_word += word.slice(1);
    return final_word;
  }
  return word;
}

function AliCat() {
  const [activeTab, setActiveTab] = useState("allCategories");
  const [selectedCategory, setSelectedCategory] = useState(null); // Track the selected category
  const [subs, setSubs] = useState([]); // Add a state for subcategories
  const [hoveredCategory, setHoveredCategory] = useState(null); // Track hovered main category

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setSelectedCategory(null);
  };

  let { selectedYear, selectedMake, selectedModel } = useAppContext();

  const [getCatObjects, { data }] = useLazyQuery(ALL_CATEGORIES);
  if (selectedYear == null) {
    selectedYear = sessionStorage.getItem("year");
    selectedMake = sessionStorage.getItem("make");
    selectedModel = sessionStorage.getItem("model");
  }
  useEffect(() => {
    if (selectedYear && selectedMake && selectedModel) {
      getcatSubset({
        variables: {
          vehicle: {
            year: Number(selectedYear),
            make: selectedMake,
            model: selectedModel,
          },
        },
      });
    }
  }, [selectedYear, selectedMake, selectedModel]);

  const [myCategories, setCatObjects] = useState([]);

  useEffect(() => {
    getCatObjects();
  }, []);

  useEffect(() => {
    if (data && data.getCategories) {
      setCatObjects(data.getCategories);
    }
  }, [data]);
  // MyGarage categories
  const [catSubset, setcatSubset] = useState([]);
  const [getcatSubset, { error, data: subset }] =
    useLazyQuery(SELECTED_CATEGORIES);
  if (error) console.log(error);

  useEffect(() => {
    getcatSubset();
  }, [getcatSubset]);
  useEffect(() => {
    getcatSubset({
      variables: {
        vehicle: {
          year: Number(selectedYear),
          make: selectedMake,
          model: selectedModel,
        },
      },
    });
  }, [getcatSubset, selectedYear, selectedMake, selectedModel]);

  useEffect(() => {
    if (subset && subset.getCategories) {
      setcatSubset(subset.getCategories);
    }
  }, [subset]);

  const [cat, setCat] = useState([]);

  function handleSubCategory(category, newSubs) {
    setCat(newSubs);
    setSelectedCategory(category);
    setHoveredCategory(category);
  }
  const history = useHistory();

  const generateSearch = (category) => {
    console.log("category", category);
    const encodedQuery = encodeURIComponent(category);
    console.log("searching for", encodedQuery);
    history.push(`/Search/${encodedQuery}`);
    history.go();
  };

  return (
    <div className="categories-dropdown-menu">
      <div className="cat-tabs">
        <button
          className={activeTab === "allCategories" ? "active" : ""}
          onClick={() => handleTabChange("allCategories")}
        >
          All Categories
          <span className="tab-line"></span>
        </button>
        {selectedYear !== "null" && (
          <button
            className={activeTab === "carCategories" ? "active" : ""}
            onClick={() => handleTabChange("carCategories")}
          >
            Categories for {selectedYear} {Capitalize(selectedMake)}{" "}
            {Capitalize(selectedModel)}
            <span className="tab-line"></span>
          </button>
        )}
      </div>
      <div className="content">
        <div className="list-content">
          {activeTab === "allCategories" && (
            <ul>
              {myCategories.map((c) => (
                <li
                  key={c}
                  onMouseEnter={() => handleSubCategory(c, c.sub_categories)}
                  onMouseLeave={() => setHoveredCategory(null)}
                  className={hoveredCategory === c ? "hovered" : ""} // Add the conditional class
                >
                  {c.category}
                </li>
              ))}
            </ul>
          )}
          {activeTab === "carCategories" && (
            <ul>
              {catSubset.map((c) => (
                <li
                  key={c}
                  onMouseEnter={() => handleSubCategory(c, c.sub_categories)}
                  onMouseLeave={() => setHoveredCategory(null)}
                  className={hoveredCategory === c ? "hovered" : ""} // Add the conditional class
                >
                  {c.category}
                </li>
              ))}
            </ul>
          )}
          <div className="sub-cat-list">
            <ul>
              {cat.map((c) => (
                <li
                  onClick={() => generateSearch(c)}
                  onMouseEnter={() => setHoveredCategory(c.category)}
                  onMouseLeave={() => setHoveredCategory(null)}
                >
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="featured-img-content">
          <img
            src="https://th.bing.com/th/id/R.bca3efe2fe3b8efcab5a04c9b75bbf53?rik=LSDlZBZPwpZ3Bw&pid=ImgRaw&r=0"
            alt="featured product"
          />
          <h1>Featured Products</h1>
          <button>Shop Now</button>
        </div>
      </div>
    </div>
  );
}

export default AliCat;
