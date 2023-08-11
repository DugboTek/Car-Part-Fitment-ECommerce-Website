import { Box } from "@chakra-ui/react";

export default function({width, height}){
    return(
        <Box w='900px'>
        <div class="sketchfab-embed-wrapper"> <iframe width={width} height={height} title="CarNoMirror" frameborder="0" allowfullscreen 
        mozallowfullscreen="true" webkitallowfullscreen="true" allow="autoplay; fullscreen; xr-spatial-tracking"
         xr-spatial-tracking execution-while-out-of-viewport execution-while-not-rendered web-share src="https://sketchfab.com/models/14e180ab25154bf491ea42a1b0b12dab/embed"> </iframe> 
         </div>
         </Box>
    );
}