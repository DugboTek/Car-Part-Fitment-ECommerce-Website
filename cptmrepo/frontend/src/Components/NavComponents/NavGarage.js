import React, { useEffect, useRef, useState } from "react";
import { Select } from "@chakra-ui/react";
import { AiFillCar } from "react-icons/ai";
import { MdCancel } from "react-icons/md";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import GarageBox from "../Garage/GarageBox";
import "../../Styles/NavStyles/NavGarage.css";
import {
  ALL_YEARS,
  SELECTED_MAKES,
  SELECTED_MODELS,
} from "../../GraphQL/queries.js";
import { useLazyQuery } from "@apollo/client";
import { useAppContext } from "../../AppContext.js";

export default function NavGarage({ car }) {
  let { selectedYear, selectedMake, selectedModel, updateSelected } =
    useAppContext();

  const [years, setYears] = useState([]);
  const [isIconHovered, setIsIconHovered] = useState(false);

  const [allowMake, setAllowMake] = useState(true);
  const [allowModel, setAllowModel] = useState(true);
  // const [selectedYear, setSelectedYear] = useState(0);
  // const [selectedMake, setSelectedMake] = useState("");
  // const [selectedModel, setSelectedModel] = useState("");
  const [allMakes, setAllMakes] = useState([]);
  const [allModels, setAllModels] = useState([]);
  const [isDropdownActive, setIsDropdownActive] = useState(false);
  if (selectedYear == null) {
    selectedYear = sessionStorage.getItem("year");
    selectedMake = sessionStorage.getItem("make");
    selectedModel = sessionStorage.getItem("model");
  }
  const [getYears, { data }] = useLazyQuery(ALL_YEARS);
  const [getMakes, { data: makeData, called, loading: makeLoading }] =
    useLazyQuery(SELECTED_MAKES);
  const [getModels, { data: modelData, loading: modelLoading }] =
    useLazyQuery(SELECTED_MODELS);

  useEffect(() => {
    getYears();
  }, [getYears]);

  useEffect(() => {
    if (data && data.getAllYears) {
      const sortedYears = data.getAllYears.slice().sort((a, b) => b - a);
      setYears(sortedYears);
    }
  }, [data]);

  useEffect(() => {
    if (selectedYear && !called) {
      setAllowMake(false);
      const intYear = parseInt(selectedYear);
      getMakes({
        variables: {
          year: intYear,
        },
      });
    }
  }, [selectedYear, getMakes, called]);

  useEffect(() => {
    if (makeData) {
      setAllMakes(makeData.getmakes);
      const intYear = parseInt(selectedYear);
      getModels({
        variables: {
          year: intYear,
          make: selectedMake,
        },
      });
    }
  }, [makeData, selectedYear, selectedMake, getModels]);

  useEffect(() => {
    if (modelData) {
      setAllowModel(false);
      setAllModels(modelData.getmodels);
      if (modelData.getModels === []) {
        setAllowModel(true);
      }
    }
  }, [modelData]);

  useEffect(() => {
    function handleOutsideClick(e) {
      const isDropdown = e.target.closest(".navGarage-cont");
      if (!isDropdown) {
        setIsDropdownActive(false);
      }
    }

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  const getGarageText = () => {
    if (
      selectedYear !== "null" &&
      selectedYear !== "" &&
      selectedMake !== null &&
      selectedMake !== "" &&
      selectedModel !== null &&
      selectedModel !== ""
    ) {
      return selectedYear + " " + selectedMake + " " + selectedModel;
    } else {
      return "Select a vehicle";
    }
  };

  function clearCar() {
    updateSelected("clear", null);
  }

  return (
    <div
      className={`navGarage-cont ${isDropdownActive ? "active" : ""}`}
      // isDropDownButton
    >
      <div
        className="navGarage-area"
        onClick={() => setIsDropdownActive(!isDropdownActive)}
      >
        <div
          className="navGarage-icon"
          onMouseEnter={() => setIsIconHovered(true)}
          onMouseLeave={() => setIsIconHovered(false)}
          onClick={isIconHovered ? clearCar : undefined}
        >
          {isIconHovered ? <MdCancel size={20} /> : <AiFillCar size={20} />}
        </div>
        <div className="navGarage-text">
          <h1>{getGarageText()}</h1>
        </div>
        <div className="navGarage-arrow">
          {isDropdownActive ? (
            <BsChevronUp size={20} />
          ) : (
            <BsChevronDown size={20} />
          )}
        </div>
      </div>
      <div className={`dropdown-menu ${isDropdownActive ? "active" : ""}`}>
        <GarageBox />
        {/* <Select
          placeholder="Year"
          value={selectedYear}
          onChange={(event) => {
            setSelectedYear(event.target.value);
            setAllMakes([]);
            setSelectedMake("");
            setAllModels([]);
            setSelectedModel("");
            setAllowModel(true);
          }}
        >
          {years.map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </Select>
        <Select
          placeholder="Make"
          value={selectedMake}
          onChange={(event) => {
            setSelectedMake(event.target.value);
          }}
          isDisabled={allowMake}
          className="menuitem"
        >
          {makeLoading ? (
            <option>Loading...</option>
          ) : (
            allMakes.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))
          )}
        </Select>
        <Select
          placeholder="Model"
          isDisabled={allowModel}
          onChange={(event) => {
            setSelectedModel(event.target.value);
          }}
          className="menuitem"
        >
          {modelLoading ? (
            <option>Loading...</option>
          ) : (
            allModels.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))
          )}
        </Select> */}
      </div>
    </div>
  );
}
