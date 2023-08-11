import React from "react";
import "../../Styles/main.css";
import "../../Styles/ResultsPageStyles/ResultCard.css";
import { SimpleGrid } from "@chakra-ui/react";
import { Box } from "@chakra-ui/react";
import { Grid, GridItem } from "@chakra-ui/react";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import QuickViewWindow from "../QuickView/modal";
import { useDisclosure } from "@chakra-ui/react";
import ItemSpecs from "../QuickView/ItemSpecs.js";
import {Link} from 'react-router-dom'


// ali new
import { useHistory } from "react-router-dom";
import createBrowserHistory from "history/createBrowserHistory";

export default function ResultBox({ product }) {

    //Ali new
    const history = createBrowserHistory({ forceRefresh: true });

    const toSpecs = () => {
        history.push({
            pathname: `/product`,
            // state: {product: product}
        });
    }


  const viewRef = React.useRef();

  const { isOpen, onOpen, onClose } = useDisclosure();
  // <SimpleGrid padding='20px' minChildWidth={property.cellWidth} spacing={property.spacing}>

  // THIS SHOULDNT WORK  -- NEEEDS TO BE FIXED
  if (product.IMAGE_URL === "") {
    product.IMAGE_URL =
      "https://th.bing.com/th/id/OIP.G0V_9qWp5vw22dxNqpNL7wHaHa?pid=ImgDet&rs=1";
  }

  var imageSource = product.image_url;
  return (
    <div className="card-container-complete">


      <Box
      onClick={toSpecs}>
        <nav ref={viewRef}>
          <div className="result-cards-container">
            <Grid templateColumns="repeat(1, 1fr)" gap={0}>
              <GridItem>
                <div className="img-container">
                  <img src={imageSource} alt=" part missinggggg"></img>
                  <Button
                    id="quick-view-btn"
                    onClick={onOpen}
                    // PASS THE PRODUCT TO ON OPEN????
                    // ALSO NEED TO PASS THE CAR FROM GARAGE HERE TO CONFIRM FITMENT
                  >
                    Quick View
                  </Button>
                  <Modal size={"xl"} isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay />
                    <ModalContent maxW="40vw">
                      <ModalCloseButton />
                      <ModalBody>
                        <ItemSpecs product={product}></ItemSpecs>
                      </ModalBody>
                    </ModalContent>
                  </Modal>
                </div>
              </GridItem>
              <GridItem>
                <div className="product-info {Type}-{Number}-card">
                  <h2 href="../ProductPage/ProductPage.js" id="product-main">
                    {product.description}
                  </h2>
                  <p id="part-num">{product.id}</p>
                  <span id="prod-price">${product.price}</span>
                  {/* <p> Review: 5 stars (132)</p> */}
                </div>
              </GridItem>
            </Grid>
          </div>
        </nav>
      </Box>
    </div>
  );
}
