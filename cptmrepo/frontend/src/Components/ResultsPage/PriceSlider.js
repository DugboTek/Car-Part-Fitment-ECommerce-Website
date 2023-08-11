import React, { useState } from "react";
import {
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Tooltip,
} from "@chakra-ui/react";

const PriceSlider = () => {
  const [sliderValue, setSliderValue] = useState(50);
  const [showTooltip, setShowTooltip] = useState(false);

  const marks = [
    { value: 25, label: "25%" },
    { value: 50, label: "50%" },
    { value: 75, label: "75%" },
  ];

  return (
    <Slider
      id="slider"
      value={sliderValue}
      min={0}
      max={100}
      colorScheme="teal"
      onChange={(v) => setSliderValue(v)}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <SliderTrack>
        <SliderFilledTrack />
      </SliderTrack>
      {marks.map((mark) => (
        <SliderMark key={mark.value} value={mark.value}>
          {mark.label}
        </SliderMark>
      ))}
      <Tooltip
        hasArrow
        bg="teal.500"
        color="white"
        placement="top"
        isOpen={showTooltip}
        label={`${sliderValue}%`}
      >
        <SliderThumb />
      </Tooltip>
    </Slider>
  );
};

const SliderMark = ({ value, children }) => (
  <div
    style={{
      position: "absolute",
      left: `${value}%`,
      transform: `translateX(-50%)`,
    }}
  >
    {children}
  </div>
);

export default PriceSlider;
