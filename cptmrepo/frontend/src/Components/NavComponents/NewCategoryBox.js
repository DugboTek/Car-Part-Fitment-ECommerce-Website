import React from "react";
import "./../../Styles/NavStyles/CategoryBox.css"; 
import { useState, useEffect } from "react";
import { Image } from "@chakra-ui/react";
import ItemSpecs from "../QuickView/modal";
import {ALL_CATEGORIES, SELECTED_CATEGORIES} from '../../GraphQL/queries.js'
import { useLazyQuery } from '@apollo/client'
import { Grid, GridItem } from "@chakra-ui/react";
import { SimpleGrid } from "@chakra-ui/react";
import { Box } from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";
import { Select, Input } from "@chakra-ui/react";
import { Button, ButtonGroup } from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import '../../Styles/NavStyles/Categories.css'
import { Divider, Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import {
  Popover,
  PopoverTrigger, 
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  PopoverAnchor,
} from "@chakra-ui/react";
import { useAppContext } from '../../AppContext';

export function NewCategoryBox() {
  let { selectedYear, selectedMake, selectedModel} = useAppContext();
//   console.log(`${selectedYear}, ${selectedMake}, ${selectedModel} from newcatbox`);
  if (selectedYear == null) {
    selectedYear = sessionStorage.getItem("year"); 
    selectedMake = sessionStorage.getItem("make");
    selectedModel = sessionStorage.getItem("model");
  }
  const [myCategories, setCatObjects] = useState([]);
  const [getCatObjects, { data }] = useLazyQuery(ALL_CATEGORIES);

  useEffect(() => {
    getCatObjects();
  }, [getCatObjects]);

  useEffect(() => {
    if (data && data.getCategories) {
      setCatObjects(data.getCategories);
    }
  }, [data]);
// MyGarage categories
  const [catSubset, setcatSubset] = useState([]);
  const [getcatSubset, { error, data: subset }] = useLazyQuery(SELECTED_CATEGORIES);
  if (error)
    console.log(error);

  /* ----------------------------------------------------------- */
  useEffect(() => {
    getcatSubset();
  }, [getcatSubset]);
useEffect(() => {
    getcatSubset({
      variables: { 
  "vehicle": {
    "year": Number(selectedYear),
    "make": selectedMake,
    "model": selectedModel,
  }
}
    });
  }, [getcatSubset, selectedYear, selectedMake, selectedModel]);

  useEffect(() => {
    if (subset && subset.getCategories) {
      setcatSubset(subset.getCategories);
    }
  }, [subset]);
//   console.log(subset);

  const [cat, setCat] = useState([]);

  function handleSubCategory(newSubs) {
    setCat(newSubs);
  }

    const { isOpen, onToggle, onClose } = useDisclosure();
    
    const [value, setValue] = React.useState('')
    const handleChange = (event) => setValue(event.target.value)

    return (

    <Box>
        <Popover trigger='hover'>
            <PopoverTrigger className='popover-trigger'>
                <a href = "/#">SHOP BY CATEGORIES</a>
            </PopoverTrigger>
        
        <PopoverContent borderColor='white'>
        <div className="drop-down-background">
            <Box className = "dropdown-box">
                <Tabs>
                    <TabList> 
                        {/* For vehicle in garage */}
                        {selectedYear && (<Tab>Categories for 
                            <span>&nbsp;{selectedYear}</span> 
                            <span className = "capitalize" >&nbsp;{selectedMake}</span> 
                            <span className = "capitalize" >&nbsp;{selectedModel}</span>
                        </Tab>)}
                        
                        <Tab>All Categories</Tab>
                        {!selectedYear && (
                            <h1>Choose a vehicle in my garage to filter available categories</h1>
                        )}
                    </TabList>
                    <TabPanels bgColor={"white"} borderColor='white' outline='0px'>
                        {selectedYear && (
                        <TabPanel> {/* for MyGarage Categories */}
                            <SimpleGrid width='100%' columns={3} spacing={0}> 
                                <Box marginLeft='5em' colSpan={2} height ='30em'> 
                                <SimpleGrid columns={1} spacing={1}>
                                        {catSubset.map((c) => (
                                            <Box marginLeft='-5em' paddingLeft='10px' onClick={() => handleSubCategory(c.sub_categories)}>
                                                <Text  className="dropdown-options">{c.category}</Text>
                                            </Box>
                                            ))}
                                    </SimpleGrid>
                                </Box>
                                <Box colSpan={1} >
                                    <SimpleGrid columns={1} spacing={1}>
                                        {cat.map((c) => (
                                            <Box height='2em'>
                                                <Text className="dropdown-options">{c}</Text>
                                            </Box>
                                        ))}
                                    </SimpleGrid>
                                </Box>
                                <Grid templateColumns='repeat(1, 1fr)' gap={1}>
                                <GridItem h='5em' >
                                    <Image h='12em'src='gibbresh.png' fallbackSrc='https://via.placeholder.com/150' />
                                    </GridItem>
                                    <GridItem w='100%' marginLeft='-1.2em' marginBottom='-5em'><Text fontSize='2xl'>RANDOM TEXT</Text> </GridItem>
                                    <GridItem w='100%'>
                                    <Button colorScheme='blue'marginTop='-8em'>Shop Now</Button>
                                    </GridItem>
                                    </Grid>
                            </SimpleGrid>
                        </TabPanel>
                        )}

                        <div className="all-categories-section">                        
                            <TabPanel> {/* for All Categories */}
                                <SimpleGrid width='100%' columns={3} spacing={0}> 
                                    <Box marginLeft='5em' colSpan={2} height ='30em'> 
                                        <SimpleGrid >
                                            {myCategories.map((c) => (
                                                <Box className="list-of-cat" marginLeft='-5em' paddingLeft='10px'  onClick={() => handleSubCategory(c.sub_categories)} >
                                                    <Text className="dropdown-options">{c.category}</Text>
                                                </Box>
                                                ))}
                                        </SimpleGrid>
                                    </Box>
                                    <Box colSpan={1} >
                                        <SimpleGrid columns={1} spacing={1}>
                                            {cat.map((c) => (
                                                <Box height='2em'>
                                                    <Text className="dropdown-options">{c}</Text>
                                                </Box>
                                            ))}
                                        </SimpleGrid>
                                    </Box>
                                    <Grid templateColumns='repeat(1, 1fr)' gap={1}>
                                        <div className="categories-right-column">
                                            <GridItem  >
                                                <Image 
                                                    className="dropdown-image"
                                                    h='12em'
                                                    src='gibbresh.png' 
                                                    fallbackSrc='https://th.bing.com/th/id/R.00e8f897a0a5119fa03a35b6778240dd?rik=iNZdcpxJRiIRdw&pid=ImgRaw&r=0' 
                                                />
                                            </GridItem>
                                            <GridItem w='100%' >
                                                <Text className='featured-part-name' fontSize='2xl'>New Arrivals</Text> 
                                            </GridItem>
                                            <GridItem w='100%'>
                                                <Button colorScheme='blue' className='shopnow-navbtn'>Shop Now</Button>
                                            </GridItem>
                                        </div>
                                    </Grid>
                                </SimpleGrid>
                            </TabPanel>
                        </div>
                        
                        
                    </TabPanels>
                </Tabs>
            </Box>
            </div>

        </PopoverContent>
        </Popover> 
    </Box>
  );
}
export default NewCategoryBox;
