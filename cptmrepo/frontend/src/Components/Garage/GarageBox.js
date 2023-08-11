// Feedback
import React, { useEffect, useRef, useState } from "react";
import { chakra } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import { useRadioGroup } from "@chakra-ui/react";
import { Card, CardHeader, CardBody, CardFooter } from "@chakra-ui/react";
import { Box } from "@chakra-ui/react";
import { Image } from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";
import { useRadio } from "@chakra-ui/react";
import {
  ALL_YEARS,
  SELECTED_MAKES,
  SELECTED_MODELS,
} from "../../GraphQL/queries.js";
import { useLazyQuery } from "@apollo/client";
import { Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import { ChevronDownIcon, CheckCircleIcon } from "@chakra-ui/icons";
import { Grid, GridItem } from "@chakra-ui/react";
import "./../../Styles/GarageStyles/GarageBox.css";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import { useAppContext } from "../../AppContext.js";

function Capitalize(word) {
  let final_word = word[0].toUpperCase();
  final_word += word.slice(1);
  return final_word;
}

function GetModels(selectedYear, selectedMake) {
  const [models, setModels] = useState([]);
  const [getModels, { data }] = useLazyQuery(SELECTED_MODELS);

  useEffect(() => {
    getModels({
      variables: {
        year: selectedYear,
        make: selectedMake,
      },
    });
  }, [getModels, selectedYear, selectedMake]);

  useEffect(() => {
    if (data && data.getmodels) {
      setModels(data.getmodels);
    }
  }, [data]);
  return models;
}

function GetMakes(selectedYear) {
  const [makes, setMakes] = useState([]);
  const [getMakes, { data }] = useLazyQuery(SELECTED_MAKES);

  useEffect(() => {
    getMakes({
      variables: {
        year: selectedYear,
      },
    });
  }, [getMakes, selectedYear]);

  useEffect(() => {
    if (data && data.getmakes) {
      setMakes(data.getmakes);
    }
  }, [data]);
  return makes;
}

function CustomRadio(props) {
  const { image, ...radioProps } = props;
  const { state, getInputProps, getRadioProps, htmlProps, getLabelProps } =
    useRadio(radioProps);

  return (
    <chakra.label {...htmlProps} cursor="pointer">
      <input {...getInputProps({})} hidden />
      <Box
        {...getRadioProps()}
        bg={state.isChecked ? "green.200" : "#d3d3d3"}
        w={5}
        p={1}
        rounded="full"
      >
        <Image
          src={
            state.isChecked
              ? image
              : "https://wallpapercave.com/wp/wp6296967.jpg"
          }
          rounded="full"
          {...getLabelProps()}
        />
      </Box>
    </chakra.label>
  );
}

export function GarageBox({ garageHeight, garageWidth }) {
  let { updateSelected, carList, updateGarage } = useAppContext();

  if (carList == null || carList.length === 0) {
    carList = sessionStorage.getItem("cars");
    carList = JSON.parse(carList) || [];
  }
  const property = {
    imageUrl:
      "https://th.bing.com/th/id/R.5e1141681888156a9e93e4c6d9e98c40?rik=fgc9vmE40Ex4GA&riu=http%3a%2f%2fimages4.fanpop.com%2fimage%2fphotos%2f22300000%2fRandom-Cars-autorev-22326979-1400-930.jpg&ehk=roZQycUHRW8gQZm8Ei6LRlD7%2b1ur8Pdlz5orpuRAj5Q%3d&risl=&pid=ImgRaw&r=0",
    imageAlt: "Picture of a Car",
    backGround: "white",
    textColor: "white",
  };

  const toast = useToast();

  const handleChange = (value) => {
    const selectedCar = carList.find((car) => car.name === value);
    toast({
      title: `The selected car was changed to ${selectedCar.name}!`,
      status: "success",
      duration: 2000,
    });
    updateSelected("y", selectedCar.year);
    updateSelected("ma", selectedCar.make);
    updateSelected("mo", selectedCar.model);
  };

  const { value, getRadioProps, getRootProps } = useRadioGroup({
    defaultValue: "Kevin",
    onChange: handleChange,
  });

  const [year, setYear] = useState(0);
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");

  var buttonLabel = {
    currentCar: "Cars in the Garage",
    year: year || "Year",
    make: make || "Make",
    model: model || "Model",
  };

  const handleList = (value) => {
    updateGarage(value);
    toast({
      title: `Your vehicle ${value.name} was added!`,
      status: "success",
      duration: 2000,
    });
  };
  //console.log(carList);

  // MongoDB queries

  const allMakes = GetMakes(year);
  const allModels = GetModels(year, make);

  const [years, setYears] = useState([]);
  const [getYears, { data }] = useLazyQuery(ALL_YEARS);

  useEffect(() => {
    getYears();
  }, [getYears]);

  useEffect(() => {
    if (data && data.getAllYears) {
      setYears(data.getAllYears);
    }
  }, [data]);

  return (
    <div>
      <Card
        width={garageWidth}
        height={garageHeight}
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        bg={property.backGround}
      >
        <CardBody>
          <Box
            bg={property.backGround}
            fontWeight="bold"
            color="#004E97"
            letterSpacing="wide"
            fontSize="1em"
            marginTop="-0.6em"
            textTransform="uppercase"
            ml="2"
            marginBottom="0.5em"
            textAlign="center"
            alignContent="center"
          >
            My Garage
          </Box>
          <Tabs
            marginLeft="2em"
            isFitted
            variant="soft-rounded"
            colorScheme="blue"
            width="80%"
          >
            <TabList lineHeight="5px" color="black" mb="0em">
              <Tab
                borderWidth="3px"
                borderColor="#D7D8DE"
                letterSpacing="wide"
                fontSize="0.6em"
              >
                ADD CAR
              </Tab>
              <Tab
                borderWidth="3px"
                borderColor="#D7D8DE"
                letterSpacing="wide"
                fontSize="0.6em"
              >
                CARS
              </Tab>
            </TabList>
            <TabPanels>
              <TabPanel alignContent="center" paddingLeft="0.5em">
                <Box>
                  <Grid templateColumns="repeat(1, 1fr)" gap={3}>
                    <GridItem>
                      <Menu>
                        {({ isOpen }) => (
                          <>
                            <MenuButton
                              className="menu_button"
                              transition="all 0.2s"
                              borderRadius="md"
                              _hover={{ bg: "gray.400" }}
                              _expanded={{ bg: "blue.400" }}
                              _focus={{ boxShadow: "outline" }}
                              isActive={isOpen}
                              as={Button}
                              rightIcon={<ChevronDownIcon />}
                            >
                              {isOpen ? "Choose A Year" : buttonLabel.year}
                            </MenuButton>
                            <MenuList className="dropdown">
                              {years.map((y) => (
                                <MenuItem
                                  key={y}
                                  onClick={() => {
                                    buttonLabel.year = y;
                                    setYear(y);
                                  }}
                                >
                                  {y}
                                </MenuItem>
                              ))}
                            </MenuList>
                          </>
                        )}
                      </Menu>
                    </GridItem>
                    <GridItem>
                      <Menu>
                        {({ isOpen }) => (
                          <>
                            <MenuButton
                              className="menu_button"
                              transition="all 0.2s"
                              borderRadius="md"
                              _hover={{ bg: "gray.400" }}
                              _expanded={{ bg: "blue.400" }}
                              _focus={{ boxShadow: "outline" }}
                              isActive={isOpen}
                              as={Button}
                              rightIcon={<ChevronDownIcon />}
                            >
                              {isOpen
                                ? "Choose A Make"
                                : Capitalize(buttonLabel.make)}
                            </MenuButton>
                            <MenuList className="dropdown">
                              {allMakes.map((m) => (
                                <MenuItem
                                  key={m}
                                  className="cap"
                                  onClick={() => {
                                    buttonLabel.make = m;
                                    setMake(m);
                                  }}
                                >
                                  {m}
                                </MenuItem>
                              ))}
                            </MenuList>
                          </>
                        )}
                      </Menu>
                    </GridItem>
                    <GridItem>
                      <Menu>
                        {({ isOpen }) => (
                          <>
                            <MenuButton
                              className="menu_button"
                              transition="all 0.2s"
                              borderRadius="md"
                              _hover={{ bg: "gray.400" }}
                              _expanded={{ bg: "blue.400" }}
                              _focus={{ boxShadow: "outline" }}
                              isActive={isOpen}
                              as={Button}
                              rightIcon={<ChevronDownIcon />}
                            >
                              {isOpen
                                ? "Choose A Model"
                                : Capitalize(buttonLabel.model)}
                            </MenuButton>
                            <MenuList className="dropdown">
                              {allModels.map((m) => (
                                <MenuItem
                                  key={m}
                                  className="cap"
                                  onClick={() => {
                                    buttonLabel.model = m;
                                    setModel(m);
                                  }}
                                >
                                  {m}
                                </MenuItem>
                              ))}
                            </MenuList>
                          </>
                        )}
                      </Menu>
                    </GridItem>
                    <GridItem>
                      <Button
                        width="7em"
                        height="1.7em"
                        onClick={() =>
                          handleList({
                            name: buttonLabel.year + " " + Capitalize(buttonLabel.make) + " " + Capitalize(buttonLabel.model),
                            make: buttonLabel.make,
                            model: buttonLabel.model,
                            year: buttonLabel.year,
                          })
                        }
                        colorScheme="blue"
                      >
                        <Text fontSize="0.8em">+ NEW CAR </Text>
                      </Button>
                    </GridItem>
                  </Grid>
                </Box>
              </TabPanel>
              <TabPanel alignContent="center">
                {carList.map((car) => (
                  <Card key={car.name} className="garageCard">
                    <Grid templateColumns="repeat(10, 1fr)" gap={0}>
                      <GridItem colSpan={9}>
                        <Text className="garageCardText">
                          {car.year} {Capitalize(car.make)}{" "}
                          {Capitalize(car.model)}
                        </Text>
                      </GridItem>
                      <GridItem colSpan={1} w="100%">
                        <CustomRadio
                          key={car.name}
                          image="https://th.bing.com/th/id/OIP.FYTSTD4s2vBzVsWlD5PtnAHaHa?pid=ImgDet&rs=1"
                          {...getRadioProps({ value: car.name })}
                        />
                      </GridItem>
                    </Grid>
                  </Card>
                ))}
              </TabPanel>
            </TabPanels>
          </Tabs>
        </CardBody>
      </Card>
    </div>
  );
}

export default GarageBox;
