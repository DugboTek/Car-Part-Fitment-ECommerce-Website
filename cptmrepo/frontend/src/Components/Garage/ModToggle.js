//Bella White
import { Box } from "@chakra-ui/react";
import React, { useState } from "react";
import { Checkbox } from "@chakra-ui/react";
import ThreedTest from "../ThreedTest";

function ModToggle({ switchLabel, partOn }) {
  const exportM = partOn;

  const imageWithoutPart =
    "https://cdn.carbuzz.com/car-thumbnails/original/4000/100/4148.jpg";
  const width = "1000px";
  const height = "600px";

  const [show3DModel, setShow3DModel] = useState(true);

  const toggleHandler = () => {
    setShow3DModel(!show3DModel);
  };

  if (!show3DModel) {
    return (
      <div>
        <Checkbox onChange={toggleHandler}>See 3D Model</Checkbox>
        <img
          width={width}
          height={height}
          src={imageWithoutPart}
          onClick={toggleHandler}
        />
      </div>
    );
  } else {
    //not responsive!!
    return (
      <div>
        <Checkbox onChange={toggleHandler}>{switchLabel}</Checkbox>

        <div
        // style={{
        //   width,
        //   height,
        //   position: "relative",
        //   overflow: "hidden",
        //   boxSizing: "border-box",
        // }}
        >
          <ThreedTest partOn={partOn} />
        </div>
      </div>
    );
  }
}

export default ModToggle;
