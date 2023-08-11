//Bella White

import "../../Styles/GarageStyles/Garage.css";
import React from 'react';
import { Box } from '@chakra-ui/react';
import GarageDoor from './GarageDoor.js';
import GarageBox from './GarageBox.js';
import { Image } from '@chakra-ui/react';

export function Garage ({width, height}) {
//width - 13em height - 16.5em
    const property = {
        backGround: 'black',
        textColor: 'red',
        garageImage: new URL('https://media.istockphoto.com/id/1453642996/vector/car-carriage-conveyance-icon-editable-vector-logo.jpg?s=170667a&w=0&k=20&c=ERWeXW4zHsia409fn8XYoVFOGULqHHyWRP4RVbTdIOU='),
        gImageALT: 'image of a garage',
        height: height,
        width: width,
    }

    return (
   
            <Box className="background" borderRadius="md" padding='0.7em' height = '80%' overflow='hidden' width='200px' >
            <div className="pair">
                <div className="roll-out">
                <GarageBox garageHeight = {property.height} garageWidth= {property.width} className="front"></GarageBox>
                {/* <br/>
                <GarageDoor garageHeight = {property.height} garageWidth= {property.width} className="back"></GarageDoor> */}
                </div>
            </div>
            </Box>

    );
}

export default Garage;