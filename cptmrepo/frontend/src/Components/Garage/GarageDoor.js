//Bella White
import { Box } from '@chakra-ui/react';
import { Image } from '@chakra-ui/react';
import garageImage from "../../Images/garageDoor.jpg";

export function GarageDoor ({garageHeight, garageWidth}) {

    const property = {
        imageAlt: 'Picture of a Garage Door',
        src: garageImage
    }

    return(
        <Box>
            <Image height={garageHeight} width = {garageWidth} src= {property.src} alt={property.imageAlt}/>
        </Box>
    );
  };
  
  export default GarageDoor;