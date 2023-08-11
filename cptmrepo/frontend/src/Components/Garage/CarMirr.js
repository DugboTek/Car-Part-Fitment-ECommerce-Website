import { Box } from "@chakra-ui/react";

export default function CarMirr({width, height}){
    return(
        <Box w='900px'>
        <div class="sketchfab-embed-wrapper"> <iframe width={width} height={height} title="CarWithMirr" frameborder="0" allowfullscreen mozallowfullscreen="true" webkitallowfullscreen="true" allow="autoplay; fullscreen; xr-spatial-tracking" xr-spatial-tracking execution-while-out-of-viewport execution-while-not-rendered web-share src="https://sketchfab.com/models/5d620b4dbfca44fb99bbfe72f0fea019/embed"> </iframe> 
        </div>
        </Box>
    );
}