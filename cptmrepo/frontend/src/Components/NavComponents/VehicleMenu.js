import React, { useState, useEffect } from "react";
import { MAKE_MODELS } from "../../GraphQL/queries.js";
import { useLazyQuery } from "@apollo/client";
import "../../Styles/NavStyles/DropdownStyling.css";
import { useHistory } from "react-router-dom";

function VehicleMenu() {
  const [selectedCategory, setSelectedCategory] = useState(null); // Track the selected category

  const [myCars, setCarObjects] = useState([]);
  const [getCarObjects, { data }] = useLazyQuery(MAKE_MODELS);

  useEffect(() => {
    getCarObjects();
  }, [getCarObjects]);

  useEffect(() => {
    if (data && data.getMakeModels) {
      setCarObjects(data.getMakeModels);
    }
  }, [data]);

  const [car, setCar] = useState([]);

  function handleModels(models) {
    setCar(models);
  }

  const [value, setValue] = React.useState("");
  const handleChange = (event) => setValue(event.target.value);

  const history = useHistory();

  const generateSearch = (category) => {
    console.log("category", category);
    const encodedQuery = encodeURIComponent(category);
    console.log("searching for", encodedQuery);
    history.push(`/Search/${encodedQuery}`);
    history.go();
  };

  return (
    <div className="categories-dropdown-menu vehicle-menu">
      <div className="cat-tabs active">
        <button>
          Vehicles
          <span className="tab-line"></span>
        </button>
      </div>

      <div className="content">
        <div className="list-content">
          <ul>
            {myCars.map((c) => (
              <li onMouseEnter={() => handleModels(c.models)}>{c.make}</li>
            ))}
          </ul>

          <div className="sub-cat-list vehicle-model-list">
            <ul className="vehicle-model-list">
              {car.map((c) => (
                <li onClick={() => generateSearch(c)}>{c}</li>
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

export default VehicleMenu;
