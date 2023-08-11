//Bella White
import React from "react";
import { Grid, GridItem } from "@chakra-ui/react";
import SumCard from "./SummaryCard.js";
import { Box } from "@chakra-ui/react";
import { Text } from '@chakra-ui/react';
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardHeader,
  MDBCheckbox,
  MDBCol,
  MDBContainer,
  MDBInput,
  MDBListGroup,
  MDBListGroupItem,
  MDBRow,
  MDBTextArea,
  MDBTypography
} from "mdb-react-ui-kit";
import { Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import { PhoneIcon, AddIcon, WarningIcon } from '@chakra-ui/icons';
import { Heading } from "@chakra-ui/react";

export default function DeliveryForm({cartList}) {

  return (
    <div className="mx-auto mt-5">
      <MDBContainer
      className="py-5"
      fluid
      style={{
        backgroundImage:
          "url(https://wallpapercave.com/wp/wp3589958.jpg)"
      }}
    >
      <MDBRow>
        <Grid templateColumns="repeat(2, 1fr)" gap={0}>
          <div>
            <MDBCol md="8" className="mb-4">
              <MDBCard className="mb-4">
                <MDBCardHeader className="py-3">
                  <Heading
                    marginBottom="0.8em"
                    size="lg"
                    textTransform="uppercase"
                  >
                    Shipping Details
                  </Heading>
                </MDBCardHeader>
                <MDBCardBody marginLeft='10px'>
                  <form>
                    <MDBRow className="mb-4 w-75">

                    <Input marginLeft="1.5em "marginBottom='5px' w='85%' bg='white' variant='outline' placeholder='First Name' />
                     
                    </MDBRow>

                    <Input marginLeft="1.5em" marginBottom='5px' w='85%' bg='white' variant='outline' placeholder='Last Name' />
        
                    <Input marginLeft="1.5em" marginBottom='5px' w='85%' bg='white' variant='outline' placeholder='Address' />
                    <Input marginLeft="1.5em" marginBottom='5px' w='85%' bg='white' variant='outline' placeholder='Email' />
                    <InputGroup>
                      <InputLeftElement pointerEvents='none'>
                        <PhoneIcon marginLeft="2.5em" color='black' />
                      </InputLeftElement>
                      <Input marginLeft="1.5em" marginBottom='5px' w='85%' bg='white' type='tel' placeholder='Phone number' />
                    </InputGroup>
                    <br />
                    <Text marginLeft="1.5em">Additional Information </Text>
                    <Box maringBottom='10px' marginLeft="1.5em">
                    <MDBTextArea
                      rows={7}
                      className="mb-4"
                      marginLeft="2em"
                    />
                    <br />

                    <div marginLeft="1.5em" className="d-flex justify-content-center">
                      <MDBCheckbox
                        name="flexCheck"
                        value=""
                        id="flexCheckChecked"
                        label="   Create an account?"
                        defaultChecked
                      />
                    </div>
                    </Box>
                  </form>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </div>
          <SumCard cart={cartList}/>
         
        </Grid>
      </MDBRow>
      </MDBContainer>
    </div>
  );
}
