// AppContext.js
import { createContext, useContext, useState } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedMake, setSelectedMake] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  const [carList, setList] = useState([]);

  function updateSelected(which, new_val) {
    if (which === "y") {
      setSelectedYear(new_val);
      sessionStorage.setItem("year", new_val);
    } else if (which === "ma") {
      setSelectedMake(new_val);
      sessionStorage.setItem("make", new_val);
    } else if (which === "mo") {
      setSelectedModel(new_val);
      sessionStorage.setItem("model", new_val);
    } else if (which === "clear") {
      updateSelected("y", null);
      updateSelected("ma", null);
      updateSelected("mo", null);
    }
  }
  function updateGarage(new_car) {
    const stored = JSON.parse(sessionStorage.getItem("cars"));
    let cars = [];
    if (stored && stored.length > 0) cars = [new_car, ...stored];
    else cars = [new_car];
    // let cars  = [new_car, ...carList];
    cars = cars.slice(0, Math.min(3, cars.length));
    console.log("slicing car in appcontext: " + cars.length);
    setList(cars);
    cars = JSON.stringify(cars);
    sessionStorage.setItem("cars", cars);
  }
  return (
    <AppContext.Provider
      value={{
        selectedYear,
        selectedMake,
        selectedModel,
        updateSelected,
        carList,
        updateGarage,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
