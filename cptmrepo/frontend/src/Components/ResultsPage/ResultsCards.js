// import "../../Styles/main.css";
// import "../../Styles/ResultsPageStyles/ResultCard.css";
import React from 'react';
import { SimpleGrid } from '@chakra-ui/react';
import { Box } from '@chakra-ui/react';
import { Grid, GridItem } from '@chakra-ui/react';

import {
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton, } from '@chakra-ui/react';
import QuickViewWindow from '../QuickView/modal';
import { useDisclosure } from '@chakra-ui/react';
import ItemSpecs from '../QuickView/ItemSpecs.js';



export default function ResultsPage() {    
    let products = [
        {
            "Type": "Air Filter", 
            "Number": "100301",
            "Price" : "19.99",
            "imgsrc" : "https://th.bing.com/th/id/R.9f4b7a15cfa61fee19671fa634fe140c?rik=7FUEDiXpM6Y7%2fg&pid=ImgRaw&r=0"
        },
        {
            "Type": "Premium Air Filter", 
            "Number": "08091999 ",
            "Price" : "9.99",
            "imgsrc" : "https://i5.walmartimages.com/asr/0eb4bd2e-608b-4f6c-9f19-fdd5f9b4fa9f.5e8dd33dfc7157de8d46d2e0ea87c7c3.jpeg?odnWidth=1000&odnHeight=1000&odnBg=ffffff"
        },
        {
            "Type": "Volvo Air Filter Pack", 
            "Number": "01182011 ",
            "Price" : "119.99",
            "imgsrc" : "https://th.bing.com/th/id/OIP.2FWxNo7YTNUVRGWgQmJN5gHaE7?pid=ImgDet&w=800&h=533&rs=1"

        },
        {
            "Type": "O'Reilly Filters", 
            "Number": "67554321 ",
            "Price" : "19.79",
            "imgsrc" : "https://th.bing.com/th/id/OIP.PeWR27LdvhOCOhaBbDCk_AAAAA?pid=ImgDet&w=320&h=320&rs=1"

        },
        {
            "Type": "Air Filter replacement pack", 
            "Number": "07061970",
            "Price" : "14.99",
            "imgsrc" : "https://th.bing.com/th/id/OIP.ZT6W8poe0agzmFHu5OLupgHaHa?pid=ImgDet&w=750&h=750&rs=1"

        },
        {
            "Type": "OEM Filter Cleaners", 
            "Number": "02171973",
            "Price" : "19.99",
            "imgsrc" : ""

        },
        {
            "Type": "Donovan Air Filters", 
            "Number": "76549871 ",
            "Price" : "19.99",
            "imgsrc" : ""

        }
    ];
    const viewRef = React.useRef();
    
    const { isOpen, onOpen, onClose } = useDisclosure()
    // <SimpleGrid padding='20px' minChildWidth={property.cellWidth} spacing={property.spacing}>

    return products.map((product) => {
        if(product.imgsrc ===''){
            product.imgsrc = 'https://th.bing.com/th/id/OIP.G0V_9qWp5vw22dxNqpNL7wHaHa?pid=ImgDet&rs=1'
        }
        return (

             <nav ref={viewRef} >
                 <div 
                    className='result-cards-container'
                >
                <Grid templateColumns='repeat(1, 1fr)' gap={0}>
                    <GridItem>
                    <div className='img-container'> 
                        <img src={product.imgsrc} alt="{Type} - {Description"></img>
                        <Button
                            id='quick-view-btn'
                            onClick={onOpen}
                        >Quick View</Button>
                        <Modal size={'xl'} isOpen={isOpen} onClose={onClose}>
                            <ModalOverlay />
                                <ModalContent>
                                    <ModalCloseButton />
                                    <ModalBody>
                                        <ItemSpecs></ItemSpecs>
                                    </ModalBody>
                                </ModalContent>
                        </Modal>
                    </div>
                    </GridItem> 
                    <GridItem>
                    <div className='product-info {Type}-{Number}-card'>
                        <h2 id='product-main'>{product.Type}</h2>
                        <p id='part-num'>{product.Number}</p>
                        <span id='prod-price'>${product.Price}</span>
                        <p> Review: 5 stars (132)</p>
                    </div>
                    </GridItem>
                </Grid>
             </div>
               
            </nav>
     
      
        );  
       
})
}


function quickView() {
    console.log('hello, this function does NOT work yet');
}