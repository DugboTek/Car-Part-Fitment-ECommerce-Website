import React from 'react';
import { useState, useEffect } from 'react';
import { Image } from '@chakra-ui/react';
import ItemSpecs from '../QuickView/modal';
import { Grid, GridItem } from '@chakra-ui/react';
import { SimpleGrid } from '@chakra-ui/react';
import { AddIcon, MinusIcon, DragHandleIcon} from '@chakra-ui/icons';
import { Box } from '@chakra-ui/react';
import { Text } from '@chakra-ui/react';
import { Select } from '@chakra-ui/react';
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
import { Input } from '@chakra-ui/react';
import { Fade, ScaleFade, Slide, SlideFade, Collapse } from '@chakra-ui/react';
import { Button, ButtonGroup } from '@chakra-ui/react';
import { useDisclosure } from '@chakra-ui/react';
import { Divider } from '@chakra-ui/react';
import { Center, Square, Circle } from '@chakra-ui/react';

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
  } from '@chakra-ui/react';

//   BELLA: I commented out your categories and no results buttons for the sake of a demo 
//Allie -- ok thanks for the heads up :)

export function Results () {

    const property = {
        bgCol : 'blue',
        cellHeight : '250px',
        cellWidth : '250px',
        numCells : 20
    }

    const [cat, setCat] = useState([]);

    function handleSubCategory(newSubs) {
        setCat(newSubs);
    };

    var myCategories = [
        { name: "Accesories", list: ['sub category 1', 'sub category 2', 'sub category 3', 'sub category 4']},
        { name: "Air Conditioning", list: ['sub category 1', 'sub category 2', 'sub category 3']},
        { name: "Batteries", list: ['sub category 1', 'sub category 2', 'sub category 3', 'sub category 4', 'sub category 5']}
      ];

    const { isOpen, onToggle, onClose } = useDisclosure();
    
    const [value, setValue] = React.useState('')
    const handleChange = (event) => setValue(event.target.value)

    return (
    <Box>
         {/* <>
            <Button bg='red' color='white' onClick={onToggle}>No Results</Button>
            <Collapse in={isOpen} animateOpacity>
              <Box
                p='40px'
                color='white'
                mt='4'
                bg='#004E97'
                rounded='md'
                shadow='md'
              >
                <Text fontSize='4xl'>No parts fit the specified vehicle: Ford 150 RSV Hybrid 2002 </Text> <Text fontSize='4xl'></Text><Text>Please try another search.</Text>
              </Box>
            </Collapse>
          </> */}
            
          {/* <Popover trigger='hover'>
            <PopoverTrigger>
                <Button>Hover to See Categories</Button>
            </PopoverTrigger>
            <PopoverContent>
                {/* <PopoverBody> */}
            <Box borderWidth='2px' borderColor='#A9A9A9' w='46em' h='32em' bg='white'>
                <SimpleGrid columns={3} spacing={0}>
                    <Box bg='white' colSpan={1} height='30em'> 
                    <Grid
                        h='30em'
                        templateRows='repeat(2, 1fr)'
                        templateColumns='repeat(6, 1fr)'
                        gap={0}
                        >
                        <GridItem colSpan={5} bg='white' >
                            <SimpleGrid columns={1} spacing={0}>
                                <Box bg='white' paddingLeft='10px' paddingTop='15px'height='4em'><Text as='b' fontSize='lg' >Featured</Text></Box>
                                <Box bg='white' paddingLeft='10px' height='2em'><Text >Brakes</Text></Box>
                                <Box bg='white' paddingLeft='10px' height='2em'><Text >Batteries</Text></Box>
                                <Box bg='white' paddingLeft='10px' height='2em'><Text >Detailing</Text></Box>
                                <Box bg='white' paddingLeft='10px' height='2em'><Text >Filters</Text></Box>
                                <Box bg='white' paddingLeft='10px' height='2em'><Text >Motor Oil</Text></Box>
                                <Box bg='white' paddingLeft='10px' height='2em'><Text >Wiper Blades</Text></Box>
                                <Box bg='white' paddingLeft='10px' height='2em'><Text >Spark Plugs</Text></Box>
                            </SimpleGrid>
                        </GridItem>
                        <GridItem paddingTop='10px' colSpan={1} bg='white'>
                            <Center height='28em'>
                                <Divider borderColor= '#A9A9A9' borderWidth='1px' orientation='vertical' />
                            </Center>
                        </GridItem>
                    </Grid>
                </Box>
                    {/* <Box> */} 
                        {/* <Center padding='1em' height='30em'> */}
                        {/* </Center>
                    </Box>     */}
                <Box bg='white' colSpan={2} height ='30em'> 
                    <SimpleGrid columns={1} spacing={1}>
                        <Box bg='white' paddingLeft='10px' paddingTop='15px'height='4em'><Text as='b' fontSize='lg' >All Categories</Text></Box>
                        {myCategories.map((category) => (
                            <>
                            <Box bg='white' paddingLeft='10px' width='10em' height='2em' onClick={() => handleSubCategory(category.list)} ><Text>{category.name}</Text></Box>
                            </>
                            ))}
                    </SimpleGrid>
                </Box>
                <Box bg='white' colSpan={1} height='30em'>
                <SimpleGrid columns={1} spacing={1}>
                        <Box bg='white' height='2em'><Text ></Text></Box>
                        {cat.map((c) => (
                            <Box bg='white' height='2em'><Text >{c}</Text></Box>
                        ))}
                        {/* <Box bg='white' height='2em'><Text >Other Part</Text></Box>
                        <Box bg='white' height='2em'><Text >Part 3</Text></Box>
                        <Box bg='white' height='2em'><Text >etc</Text></Box>
                        <Box bg='white' height='2em'><Text >etc</Text></Box>
                        <Box bg='white' height='2em'><Text >etc</Text></Box>
                        <Box bg='white' height='2em'><Text >etc</Text></Box>
                        <Box bg='white' height='2em'><Text >etc</Text></Box>
                        <Box bg='white' height='2em'><Text >etc</Text></Box>
                        <Box bg='white' height='2em'><Text >etc</Text></Box> */}
                    </SimpleGrid>
                </Box>
                </SimpleGrid>
            </Box>
                {/* { </PopoverBody> }
            </PopoverContent>
            </Popover>  */}

        {/* <Tabs>
        <TabList>
            <Tab>List View</Tab>
            <Tab>Grid View</Tab>
        </TabList>

        <TabPanels>
            <TabPanel>
                <Grid templateColumns='repeat(2, 1fr)' padding='10px' gap={0}>
                    <GridItem w='100%' h='10' ><Text paddingLeft='20px' fontSize='25px' as='b'>SEARCH TEXT </Text></GridItem>
                    <GridItem w='100%' h='10' alignContent='left' paddingRight='20px' paddingLeft='150px'> <Select aligmContent='left' w='100%' paddingBottom='20px' paddingTop='10px' placeholder='Relevance'>
                        <option value='Price Low to High'>Price Low to High</option>
                        <option value='Price High to Low'>Price High to Low</option>
                        <option value='Highly Rated'>Highly Rated</option>
                        </Select>
                    </GridItem>
                </Grid>
                
                <div>
                    <SimpleGrid padding = '10px' templateColumns='repeat(1, 1fr)' minChildWidth='120px' spacing='20px'>
                            <Box height='70px' borderColor='black' borderWidth='2px' borderRadius='lg' overflow='hidden' >
                                <Grid templateColumns='repeat(5, 1fr)' gap={6}>
                                    <GridItem w='100%' h='10' > <Text paddingLeft='20px' fontSize='25px' as='b'>PRODUCT </Text></GridItem> 
                                    <GridItem w='100%' h='10' />
                                    <GridItem w='180px' > 
                                        <Grid templateColumns="repeat(4, 1fr)" padding='5px' gap={0}>
                                            <Box border='2px' borderColor='#A9A9A9' w='100%' bg="white"><MinusIcon paddingLeft='8px' paddingRight = '8px' paddingTop='10px' boxSize={8}/></Box>
                                            <Box border='2px' borderColor='#A9A9A9' w='100%' bg="white"><Input type='number' value={value} onChange={handleChange} htmlSize={1} width='100%' /></Box>
                                            <Box border='2px' borderColor='#A9A9A9' w='100%' bg="white" ><AddIcon paddingLeft='8px' paddingRight = '8px' paddingTop='10px' boxSize={8}/></Box>
                                            <Box><Text paddingLeft='5px' fontSize='md'>Quantity</Text></Box>
                                        </Grid>
                                    </GridItem>
                                    <GridItem w='100%' h='10' bg='white' ><Text paddingLeft='20px' paddingTop='20px' fontSize='25px' as='b'>$1,095.00 </Text></GridItem>
                                    <GridItem w='100%' h='10' bg='white' paddingTop='10px' paddingLeft='8em' paddingRight='1em'> <ItemSpecs></ItemSpecs></GridItem>
                                </Grid>
                            </Box>
                            <Box height='70px' borderColor='black' borderWidth='2px' borderRadius='lg' overflow='hidden' >
                                <Grid templateColumns='repeat(5, 1fr)' gap={6}>
                                    <GridItem w='100%' h='10' > <Text paddingLeft='20px' fontSize='25px' as='b'>PRODUCT </Text></GridItem> 
                                    <GridItem w='100%' h='10' />
                                    <GridItem w='180px' > 
                                        <Grid templateColumns="repeat(4, 1fr)" padding='5px' gap={0}>
                                            <Box border='2px' borderColor='#A9A9A9' w='100%' bg="white"><MinusIcon paddingLeft='8px' paddingRight = '8px' paddingTop='10px' boxSize={8}/></Box>
                                            <Box border='2px' borderColor='#A9A9A9' w='100%' bg="white"><Input type='number' value={value} onChange={handleChange} htmlSize={1} width='100%' /></Box>
                                            <Box border='2px' borderColor='#A9A9A9' w='100%' bg="white" ><AddIcon paddingLeft='8px' paddingRight = '8px' paddingTop='10px' boxSize={8}/></Box>
                                            <Box><Text paddingLeft='5px' fontSize='md'>Quantity</Text></Box>
                                        </Grid>
                                    </GridItem>
                                    <GridItem w='100%' h='10' bg='white' ><Text paddingLeft='20px' paddingTop='20px' fontSize='25px' as='b'>$1,095.00 </Text></GridItem>
                                    <GridItem w='100%' h='10' bg='white' paddingTop='10px' paddingLeft='8em' paddingRight='1em'> <ItemSpecs></ItemSpecs></GridItem>
                                </Grid>
                            </Box>
                            <Box height='70px' borderColor='black' borderWidth='2px' borderRadius='lg' overflow='hidden' >
                                <Grid templateColumns='repeat(5, 1fr)' gap={6}>
                                    <GridItem w='100%' h='10' > <Text paddingLeft='20px' fontSize='25px' as='b'>PRODUCT </Text></GridItem> 
                                    <GridItem w='100%' h='10' />
                                    <GridItem w='180px' > 
                                        <Grid templateColumns="repeat(4, 1fr)" padding='5px' gap={0}>
                                            <Box border='2px' borderColor='#A9A9A9' w='100%' bg="white"><MinusIcon paddingLeft='8px' paddingRight = '8px' paddingTop='10px' boxSize={8}/></Box>
                                            <Box border='2px' borderColor='#A9A9A9' w='100%' bg="white"><Input type='number' value={value} onChange={handleChange} htmlSize={1} width='100%' /></Box>
                                            <Box border='2px' borderColor='#A9A9A9' w='100%' bg="white" ><AddIcon paddingLeft='8px' paddingRight = '8px' paddingTop='10px' boxSize={8}/></Box>
                                            <Box><Text paddingLeft='5px' fontSize='md'>Quantity</Text></Box>
                                        </Grid>
                                    </GridItem>
                                    <GridItem w='100%' h='10' bg='white' ><Text paddingLeft='20px' paddingTop='20px' fontSize='25px' as='b'>$1,095.00 </Text></GridItem>
                                    <GridItem w='100%' h='10' bg='white' paddingTop='10px' paddingLeft='8em' paddingRight='1em'> <ItemSpecs></ItemSpecs></GridItem>
                                </Grid>
                            </Box>
                    </SimpleGrid>
                </div>    
                </TabPanel>    
                <TabPanel>
                <Grid templateColumns='repeat(2, 1fr)' gap={0}>
                    <GridItem w='100%' h='10' ><Text paddingLeft='20px' fontSize='25px' as='b'>SEARCH TEXT </Text></GridItem>
                    <GridItem w='100%' h='10' alignContent='left' paddingRight='20px' paddingLeft='150px'> <Select aligmContent='left' w='100%' paddingTop='10px' placeholder='Relevance'>
                        <option value='Price Low to High'>Price Low to High</option>
                        <option value='Price High to Low'>Price High to Low</option>
                        <option value='Highly Rated'>Highly Rated</option>
                        </Select>
                    </GridItem>
                </Grid>
                
                <div>
                    <SimpleGrid padding='20px' minChildWidth={property.cellWidth} spacing='10px'>
                       
                        <Box bg={property.bgCol} height={property.cellHeight}></Box>
                        <Box bg={property.bgCol} height={property.cellHeight}></Box>
                        <Box bg={property.bgCol} height={property.cellHeight}></Box>
                        <Box bg={property.bgCol} height={property.cellHeight}></Box>
                        <Box bg={property.bgCol} height={property.cellHeight}></Box>
                    </SimpleGrid>
                </div>
            </TabPanel>
        </TabPanels>

        </Tabs>
    </Box> */}
    </Box>
    );
}

export default Results;
