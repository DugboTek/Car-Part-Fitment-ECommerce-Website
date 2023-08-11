import React from "react";
import { useState, useEffect } from "react";
import "./../../Styles/NavStyles/CategoryBox.css"; 
import { Image } from "@chakra-ui/react";
import { MAKE_MODELS } from '../../GraphQL/queries.js'
import { useLazyQuery } from '@apollo/client'
import { Grid, GridItem } from "@chakra-ui/react";
import { SimpleGrid } from "@chakra-ui/react";
import { Box } from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";
import { Button, ButtonGroup } from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
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

export function VehicleBox() {

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

    const { isOpen, onToggle, onClose } = useDisclosure();
    
    const [value, setValue] = React.useState('')
    const handleChange = (event) => setValue(event.target.value)

    return (
    <Box>

        <Popover trigger='hover'>
            <PopoverTrigger>
                <a href = "/#">SHOP BY VEHICLES</a>
            </PopoverTrigger>
            <PopoverContent>
                <Box className = "dropdown-box">
                    <Tabs>
                        <TabList>
                            <Tab>All Makes</Tab>
                        </TabList>

                        <TabPanels>
                            <TabPanel>
                                <SimpleGrid width='100%' columns={3} spacing={0}> 
                                    <Box marginLeft='5em' colSpan={2} height ='30em'> 
                                        <SimpleGrid columns={1} spacing={1}>
                                            {myCars.map((c) => (
                                                <Box key={c.make} marginLeft='-5em' paddingLeft='10px'  onClick={() => handleModels(c.models)} >
                                                    <Text as='b'  className="dropdown-options">{c.make}</Text>
                                                </Box>
                                                ))}
                                        </SimpleGrid>
                                    </Box>
                                    <Box colSpan={1} >
                                        <SimpleGrid columns={1} spacing={1}>
                                                {car.map((c) => (
                                                    <Box key={c} height='2em'>
                                                        <Text className="dropdown-options">{c}</Text>
                                                    </Box>
                                                ))}
                                        </SimpleGrid>
                                    </Box>
                                    <Grid templateColumns='repeat(1, 1fr)' gap={1}>
                                        <GridItem h='5em' >
                                            <Image h='12em'src='gibbresh.png' fallbackSrc='https://via.placeholder.com/150' />
                                        </GridItem>
                                        <GridItem w='100%' marginLeft='-1.2em' marginBottom='-5em'>
                                            <Text fontSize='2xl'>RANDO TEXT</Text> 
                                        </GridItem>
                                        <GridItem w='100%'>
                                            <Button colorScheme='blue'marginTop='-8em'>Shop Now</Button>
                                        </GridItem>
                                    </Grid>
                                </SimpleGrid>
                            </TabPanel>
                        </TabPanels>
                    </Tabs>
                </Box>
            </PopoverContent>
        </Popover> 
    </Box>
  );
}

export default VehicleBox;
