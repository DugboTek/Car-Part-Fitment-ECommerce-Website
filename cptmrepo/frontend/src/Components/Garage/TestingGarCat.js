import "../../Styles/GarageStyles/Garage.css";
import { Box } from '@chakra-ui/react';
import GarageDoor from './GarageDoor.js';
import React,  {useEffect, useRef, useState} from 'react'
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
  } from '@chakra-ui/react'
import { chakra } from '@chakra-ui/react'
import { useToast } from '@chakra-ui/react'
import { useRadioGroup } from '@chakra-ui/react'
import { Card, CardHeader, CardBody, CardFooter } from '@chakra-ui/react'
import { Image } from '@chakra-ui/react'
import { Text } from '@chakra-ui/react'
import {ALL_CATEGORIES} from '../../GraphQL/queries.js';
import { useDisclosure } from "@chakra-ui/react";
import { SimpleGrid } from "@chakra-ui/react";
import { useRadio } from '@chakra-ui/react'
import {ALL_YEARS, SELECTED_MAKES, SELECTED_MODELS} from '../../GraphQL/queries.js'
import { useLazyQuery } from '@apollo/client'
import {Menu, MenuButton, MenuList, MenuItem} from '@chakra-ui/react'
  import { Button } from '@chakra-ui/react'
  import { ChevronDownIcon, CheckCircleIcon } from '@chakra-ui/icons'
  import { Grid, GridItem } from '@chakra-ui/react'
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'

function GetModels(selectedYear, selectedMake){
  const [models, setModels] = useState([]);
  const [getModels, { data }] = useLazyQuery(SELECTED_MODELS);

  useEffect(() => {
    getModels({
      variables: {
        "year": selectedYear,
        'make': selectedMake
      }});
  }, [getModels, selectedYear, selectedMake]);

  useEffect(() => {
    if (data && data.getmodels) {
      setModels(data.getmodels);
    }
  }, [data]);
  return(models);
}

function GetMakes(selectedYear){
  const [makes, setMakes] = useState([]);
  const [getMakes, { data }] = useLazyQuery(SELECTED_MAKES);

  useEffect(() => {
    getMakes({
      variables: {
        "year": selectedYear
      }});
  }, [getMakes, selectedYear]);

  useEffect(() => {
    if (data && data.getmakes) {
      setMakes(data.getmakes);
    }
  }, [data]);
  return(makes);
}

function CustomRadio(props) {
      const { image, ...radioProps } = props
      const { state, getInputProps, getRadioProps, htmlProps, getLabelProps } =
        useRadio(radioProps)
  
      return (
        <chakra.label {...htmlProps} cursor='pointer'>
          <input {...getInputProps({})} hidden />
          <Box
            {...getRadioProps()}
            bg={state.isChecked ? 'green.200' : 'transparent'}
            w={5}
            p={1}
            rounded='full'
          >
            <Image src={state.isChecked ? image : 'https://wallpapercave.com/wp/wp6296967.jpg'} rounded='full' {...getLabelProps()} />
          </Box>
        </chakra.label>
      )
}

function NewCategoryBox({selectedCar}) {

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
                      <Tab>All Categories</Tab>
                      <Tab>Categories for {selectedCar}</Tab>
                  </TabList>
  
                  <TabPanels>
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
                  </TabPanels>
                  </Tabs>
                  <SimpleGrid columns={3} spacing={0}>
                  </SimpleGrid>
              </Box>
          
    );
  }


export default function TestingGarCat ({width, height, trigger}) {
//width - 13em height - 16.5em

const property = {
    imageUrl: 'https://th.bing.com/th/id/R.5e1141681888156a9e93e4c6d9e98c40?rik=fgc9vmE40Ex4GA&riu=http%3a%2f%2fimages4.fanpop.com%2fimage%2fphotos%2f22300000%2fRandom-Cars-autorev-22326979-1400-930.jpg&ehk=roZQycUHRW8gQZm8Ei6LRlD7%2b1ur8Pdlz5orpuRAj5Q%3d&risl=&pid=ImgRaw&r=0',
    imageAlt: 'Picture of a Car',
    backGround: 'white',
    textColor: 'white',
    garageImage: new URL('https://media.istockphoto.com/id/1453642996/vector/car-carriage-conveyance-icon-editable-vector-logo.jpg?s=170667a&w=0&k=20&c=ERWeXW4zHsia409fn8XYoVFOGULqHHyWRP4RVbTdIOU='),
    gImageALT: 'image of a garage',
    height: height,
    width: width,
}

var myCars = [
    { name: "Honda HV5", make: "outi", model: "hybrid", year: 2000, image: 'https://randomuser.me/api/portraits/women/44.jpg'},
    { name: "Toyota SVG", make: "Toyota", model: "SUV", year: 1999,  image: 'https://randomuser.me/api/portraits/men/86.jpg' },
    { name: "Ram 3000", make: "prius", model: "single rider", year: 2020, image: 'https://randomuser.me/api/portraits/men/29.jpg' }
];

const [carList, setList] = React.useState(myCars)

const toast = useToast()

const handleChange = (value) => {
    toast({
      title: `The Selected Car was changed to ${value}!`,
      status: 'success',
      duration: 2000,
    })
  }

const { value, getRadioProps, getRootProps } = useRadioGroup({
    defaultValue: 'Kevin',
    onChange: handleChange,
  })

var buttonLabel = {
    currentCar : 'Cars in the Garage',
    make : 'Make',
    model : 'Model',
    year : 'Year'
}

const handleList = (value) => {
    setList((prevItems) => {
              return [value, ...prevItems];
            });
}

var slicedArray = carList.slice(0, 3);

// MongoDB queries
const [selectedYear, setSelectedYear] = useState(0);
const [selectedMake, setSelectedMake] = useState('');

function handleSelectedMake(ma){
  setSelectedMake(ma);
}

function handleSelectedYear(ye) {
  setSelectedYear(ye);
}

const allMakes = GetMakes(selectedYear);
const allModels = GetModels(selectedYear, selectedMake);

const [years, setYears] = useState([]);
const [getYears, { data }] = useLazyQuery(ALL_YEARS);

useEffect(() => {
  // Call the query function to fetch the data when the component mounts
  getYears();
}, [getYears]);

useEffect(() => {
  if (data && data.getAllYears) {
    setYears(data.getAllYears);
  }
}, [data]);



    return (
        <div>
             <Popover trigger='hover'>
       <PopoverTrigger>
       {trigger}
       </PopoverTrigger>
        <PopoverContent><NewCategoryBox selectedCar={value}/></PopoverContent> </Popover>
            <Box className="background" borderRadius="md" padding='0.7em' height = '17%' overflow='hidden' width='19%' >
            <div className="pair">
                <div className="roll-out">
                <div>
        <Card  width = {property.width} height={property.height} borderWidth='1px' borderRadius='lg' overflow='hidden' bg={property.backGround}>
                    <CardBody>

        <Box
        bg = {property.backGround}
        fontWeight='bold'
        color='#004E97'
        letterSpacing='wide'
        fontSize='1em'
        marginTop='-0.6em'
        textTransform='uppercase'
        ml='2'
        marginBottom='0.5em'
        textAlign='center'

        >
        My Garage
        </Box>
        <Tabs  isFitted variant='soft-rounded' colorScheme='blue'width='100%'>
        <TabList  tlineHeight='5px'color='black' mb='0em'>
            <Tab borderWidth='3px' borderColor='#D7D8DE' letterSpacing='wide' fontSize='0.6em' >CARS</Tab>
            <Tab borderWidth='3px' borderColor='#D7D8DE' letterSpacing='wide' fontSize='0.6em'>ADD CAR</Tab>
        </TabList>
        <TabPanels>
            <TabPanel alignContent='center'>
            {slicedArray.map((car) => (
                <Card margintop='-1em' marginBottom='0.5em' height='2em' borderWidth='1px' marginLeft='-1em'borderColor='#d3d3d3' width='10.5em'>
                        <Grid templateColumns='repeat(10, 1fr)' gap={0}>
                            <GridItem colSpan={3}> 
                            <Image h='25px' objectFit='cover' margin='3px' src={property.imageUrl} alt={property.imageAlt} />  
                            </GridItem>
                            <GridItem marginTop='-0.7em' marginLeft='-1em' colSpan={6} w='100%' > 
                                    <Text color='#A9A9A9' fontSize='0.6em' >{car.year} {car.make}</Text>
                                    <Text color='#383838' marginTop='-1.7em' textAlign='left' fontSize='0.7em'>{car.name}</Text>
                                </GridItem>
                            <GridItem colSpan={1} w='100%' > 
                            <CustomRadio
                                key={car.name}
                                image='https://th.bing.com/th/id/OIP.FYTSTD4s2vBzVsWlD5PtnAHaHa?pid=ImgDet&rs=1'
                                {...getRadioProps({ value: car.name })}
                            />
                            </GridItem>
                        </Grid>
                </Card>
            ))}
            <Button colorScheme='teal' variant='link'>
                <Text color='#004E97' marginRight='-8em' align='center' as='u' fontSize='0.7em'>See All</Text>
            </Button>

            </TabPanel>

            <TabPanel alignContent='center' paddingLeft='0.5em'>
                <Box>
                <Grid templateColumns='repeat(1, 1fr)' gap={3}>
                <GridItem>
                <Menu >
                    {({ isOpen }) => (
                        <>
                        <MenuButton transition='all 0.2s' height='2em'width='10em' borderRadius='md'borderWidth='0.2em' _hover={{ bg: 'gray.400' }} _expanded={{ bg: 'blue.400' }}
            _focus={{ boxShadow: 'outline' }} isActive={isOpen} as={Button} rightIcon={<ChevronDownIcon />}>
                            {isOpen ? 'Choose A Year' : buttonLabel.year}
                        </MenuButton>
                        <MenuList >
                            {years.map((y) => (
                            <MenuItem onClick={() =>{buttonLabel.year = y; handleSelectedYear(y);}}>{y}</MenuItem>)
                            )}
                        </MenuList>
                        </>
                    )}
                </Menu>
                </GridItem>
                <GridItem>
                <Menu>
                    {({ isOpen }) => (
                        <>
                        <MenuButton transition='all 0.2s' height='2em'width='10em' borderRadius='md'borderWidth='0.2em' _hover={{ bg: 'gray.400' }} _expanded={{ bg: 'blue.400' }}
            _focus={{ boxShadow: 'outline' }} isActive={isOpen} as={Button} rightIcon={<ChevronDownIcon />}>
                            {isOpen ? 'Choose A Make' : buttonLabel.make}
                        </MenuButton>
                        <MenuList>
                          {allMakes.map((m) => (
                               <MenuItem onClick={() =>{buttonLabel.make = m; handleSelectedMake(m);}}>{m}</MenuItem>
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
                                <MenuButton transition='all 0.2s' height='2em'width='10em' borderRadius='md'borderWidth='0.2em' _hover={{ bg: 'gray.400' }} _expanded={{ bg: 'blue.400' }}
            _focus={{ boxShadow: 'outline' }} isActive={isOpen} as={Button} rightIcon={<ChevronDownIcon />}>
                                    {isOpen ? 'Choose A Current Model' : buttonLabel.model}
                                </MenuButton>
                                <MenuList>
                                  {allModels.map((m)=> (
                                    <MenuItem onClick={() => {buttonLabel.model = m;}}>{m}</MenuItem>
                                  ))}

                                </MenuList>
                                </>
                            )}
                    </Menu>
                </GridItem>
                <GridItem>
                <Button width='7em' height='1.7em' onClick={() => handleList({name: (buttonLabel.make + ' / ' + buttonLabel.year), make: buttonLabel.make, model: buttonLabel.model, year: buttonLabel.year})} colorScheme='blue'><Text fontSize='0.8em'>+ NEW CAR </Text></Button>
                </GridItem>
                </Grid>

                </Box>
            </TabPanel>
        </TabPanels>
        </Tabs>
        <Box p='6'>
        </Box>
    </CardBody>
 </Card>
    </div>
                </div>
            </div>
            </Box>
        </div>
    );
}