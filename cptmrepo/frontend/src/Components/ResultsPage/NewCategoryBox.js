import React from "react";
import { useState, useEffect } from "react";
import { Image } from "@chakra-ui/react";
import ItemSpecs from "../QuickView/modal";
import {ALL_CATEGORIES} from '../../GraphQL/queries.js';
import { useDisclosure } from "@chakra-ui/react";
import { SimpleGrid } from "@chakra-ui/react";
import { useLazyQuery } from '@apollo/client'
import { Grid, GridItem } from "@chakra-ui/react";
import { AddIcon, MinusIcon, DragHandleIcon } from "@chakra-ui/icons";
import { Box } from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";
import { Select } from "@chakra-ui/react";
import { Input } from "@chakra-ui/react";
import { Fade, ScaleFade, Slide, SlideFade, Collapse } from "@chakra-ui/react";
import { Button, ButtonGroup } from "@chakra-ui/react";
import { Divider } from "@chakra-ui/react";
import { Center, Square, Circle } from "@chakra-ui/react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
// WRONG FILE
// USE THE VERSION OF THIS FILE IN NAV FOLDER
export function NewCategoryBox({trigger}) {

  const [myCategories, setCatObjects] = useState([]);
  const [getCatObjects, { data }] = useLazyQuery(ALL_CATEGORIES);

  useEffect(() => {
    getCatObjects([getCatObjects]);
  });

  useEffect(() => {
    if (data && data.getCategories) {
      setCatObjects(data.getCategories);
    }
  }, [data]);


  const property = {
    bgCol: "blue",
    cellHeight: "250px",
    cellWidth: "250px",
    numCells: 20,
  };

  const [cat, setCat] = useState([]);

  function handleSubCategory(newSubs) {
    setCat(newSubs);
  }

    const { isOpen, onToggle, onClose } = useDisclosure();
    
    const [value, setValue] = React.useState('')
    const handleChange = (event) => setValue(event.target.value)

    return (

        <Box borderWidth='2px' borderColor='#A9A9A9' w='46em' h='32em' bg='white'>

            <Tabs>
                <TabList>
                    <Tab>Categories for Chevy Chase</Tab>
                    <Tab> ALL CATEGORIESSS</Tab>
                </TabList>

                <TabPanels>
                <TabPanel>
                    <SimpleGrid width='100%' columns={3} spacing={0}> 
                        <Box marginLeft='5em' colSpan={2} height ='30em'> 
                        <SimpleGrid columns={1} spacing={1}>
                            {myCategories.map((category) => (
                                <>
                                <Box marginLeft='-5em' paddingLeft='10px'  onClick={() => handleSubCategory(category.list)} ><Text  as='b'>{category.name}</Text></Box>
                                </>
                                ))}
                        </SimpleGrid>
                    </Box>

                        <Box colSpan={1} >
                        <SimpleGrid columns={1} spacing={1}>
                                <Box height='2em'><Text ></Text></Box>
                                {cat.map((c) => (
                                    <Box height='2em'><Text >{c}</Text></Box>
                                ))}
                                
                            </SimpleGrid>
                        </Box>
                        <Grid templateColumns='repeat(1, 1fr)' gap={1}>
                        <GridItem h='5em' >
                            <Image h='12em'src='gibbresh.png' fallbackSrc='https://via.placeholder.com/150' />
                            </GridItem>
                            <GridItem w='100%' marginLeft='-1.2em' marginBottom='-5em'><Text fontSize='2xl'>RANDO TEXT</Text> </GridItem>
                            <GridItem w='100%'>
                            <Button colorScheme='blue'>Shop Now</Button>
                            </GridItem>
                            </Grid>
                        </SimpleGrid>
                </TabPanel>
                    <TabPanel>
                    <SimpleGrid width='100%' columns={3} spacing={0}> 

                        <Box marginLeft='5em' colSpan={2} height ='30em'> 
                        <SimpleGrid columns={1} spacing={1}>
                            {myCategories.map((c) => (
                                <>
                                <Box marginLeft='-5em' paddingLeft='10px'  onClick={() => handleSubCategory(c.sub_categories)} ><Text as='b'>{c.category}</Text></Box>
                                </>
                                ))}
                        </SimpleGrid>
                    </Box>

                        <Box colSpan={1} >
                        <SimpleGrid columns={1} spacing={1}>
                                <Box height='2em'><Text ></Text></Box>
                                {cat.map((c) => (
                                    <Box height='2em'><Text >{c}</Text></Box>
                                ))}
                                
                            </SimpleGrid>
                        </Box>
                        <Grid templateColumns='repeat(1, 1fr)' gap={1}>
                        <GridItem h='5em' >
                            <Image h='12em'src='gibbresh.png' fallbackSrc='https://via.placeholder.com/150' />
                            </GridItem>
                            <GridItem w='100%' marginLeft='-1.2em' marginBottom='-5em'><Text fontSize='2xl'>RANDO TEXT</Text> </GridItem>
                            <GridItem w='100%'>
                            <Button colorScheme='blue'>Shop Now</Button>
                            </GridItem>
                            </Grid>
                        </SimpleGrid>
                    </TabPanel>

                 
                </TabPanels>
                </Tabs>
                <SimpleGrid columns={3} spacing={0}>
                </SimpleGrid>
            </Box>
        
  );
}

export default NewCategoryBox;
