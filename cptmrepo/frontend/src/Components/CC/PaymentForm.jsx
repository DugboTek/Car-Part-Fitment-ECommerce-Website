//Bella White
import React from "react";
import { useDisclosure } from "@chakra-ui/react";
import { Radio, RadioGroup } from '@chakra-ui/react';
import { MDBContainer, MDBInput, MDBRow } from "mdb-react-ui-kit";
import { Text } from '@chakra-ui/react';
import { Button, ButtonGroup } from "@chakra-ui/react";
import { Card, CardHeader, CardBody, CardFooter } from "@chakra-ui/react";
import { Grid, GridItem } from "@chakra-ui/react";
import { Heading } from "@chakra-ui/react";
import ConfirmOrder from "./ConfirmOrder.js";

export default function PaymentForm() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [value, setValue] = React.useState('1');
  return (
    <MDBContainer
      className="py-5"
      fluid
      style={{
        backgroundImage:
          "url(https://wallpapercave.com/wp/wp3589958.jpg)"
      }}
    >
      <Grid maringLeft='2em' templateColumns="repeat(2, 1fr)" gap={6}>
        <GridItem>
          <div className="text-center mb-4"></div>
          <Heading
            marginTop="1em"
            marginLeft="1em"
            marginBottom="0.8em"
            size="lg"
            textTransform="uppercase"
          >
            Saved Cards
          </Heading>

          <Grid marginLeft="1.5em" templateColumns="repeat(1, 1fr)" gap={2}>
            <GridItem>
              <Card >
                <CardBody>
                  <Grid templateColumns="repeat(4, 1fr)">
                    <Radio></Radio>
                    <img
                      alt = "visa card logo"
                      className="img-fluid"
                      src="https://img.icons8.com/color/48/000000/visa.png"
                    />
                    <MDBInput
                      id="form1"
                      type="text"
                      size="lg"
                      value="**** **** **** 3193"
                    />
                    <Button colorScheme="red" size='xs'>
                      Remove
                    </Button>
                  </Grid>
                </CardBody>
              </Card>
            </GridItem>
            <GridItem>
              <Card>
                <CardBody>
                  <Grid templateColumns="repeat(4, 1fr)">
                    <Radio></Radio>
                    <img
                      alt = "master card logo"
                      className="img-fluid"
                      src="https://img.icons8.com/color/48/000000/mastercard-logo.png"
                    />
                    <MDBInput
                      id="form1"
                      type="text"
                      size="lg"
                      value="**** **** **** 3193"
                    />
                    <Button colorScheme="red" size='xs'>
                      Remove
                    </Button>
                  </Grid>
                </CardBody>
              </Card>
            </GridItem>
          </Grid>
        </GridItem>
        <GridItem marginLeft='2em'>
          <Heading
            marginLeft="-0.8em"
            marginTop="1em"
            marginBottom="0.8em"
            size="md"
            textTransform="uppercase"
          >
            <Button colorScheme='facebook'>+ New Card</Button>
          </Heading>
          <Grid templateColumns='repeat(1, 1fr)' gap={1}>
            <GridItem w='100%'  ><Text>Cardholder's Name</Text></GridItem>
            <GridItem w='100%'  ><MDBInput
                      id="form3"
                      type="text"
                      size="lg"
                      value="Anna Doe"/>
            </GridItem>
          </Grid>
          
          <MDBRow className="my-4">
          <Grid templateColumns='repeat(1, 1fr)' gap={1}>
            <GridItem w='100%'>Card Number</GridItem>
            <GridItem w='100%'><MDBInput
                          id="form4"
                          type="text"
                          size="lg"
                          value="1234 5678 1234 5678"
                        />
            </GridItem>
          </Grid>

          <Grid templateColumns='repeat(1, 1fr)' gap={1}>
            <GridItem w='100%'>Expiration Date</GridItem>
            <GridItem w='100%'> 
              <MDBInput
                id="form5"
                size="lg"
                placeholder="MM/YYYY"
                value="MM/YYYY"
              />
            </GridItem>
          </Grid>

          <Grid templateColumns='repeat(1, 1fr)' w='100%' gap={1}>
            <GridItem w='100%'>Security Code (CVV)</GridItem>
            <GridItem w='100%'> 
              <MDBInput
                            id="form6"
                            type="password"
                            size="lg"
                            placeholder="CVV"
                          />
            </GridItem>
          </Grid>
           
          </MDBRow>
          <Button marginTop="1em" colorScheme="green" size="sm">
            Add
          </Button>
          <br />
          {/* <Select

            marginBottom="1em"
            marginTop="3em"
            bg="white"
            w='300px'
            placeholder="Select a Card"
          >
            <option value="card 1 VISA">VISA **** **** **** 3193</option>
            <option value="card 2 DISCOVER">Discover **** **** **** 3193</option>
            <option value="card 4 XXX">AA **** **** **** 3193</option>
          </Select> */}
          <ConfirmOrder props={onClose} />
          <br/>
        </GridItem>
      </Grid>
      
    </MDBContainer>
  );
}
