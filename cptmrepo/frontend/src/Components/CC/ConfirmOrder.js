//Bella White
import { Button, ButtonGroup } from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import { Box } from "@chakra-ui/react";
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription
} from "@chakra-ui/react";

export default function ConfirmOrder({ props }) {
  const { isOpen: isVisible, onClose, onOpen } = useDisclosure({
    defaultIsOpen: false
  });

  return isVisible ? (
    <Alert status="success">
      <AlertIcon />
      <Box>
        <AlertTitle>Success!</AlertTitle>
        <AlertDescription>
          Your order is confirmed and will arrive between 1-2 weeks. Thank you for your purchase. Your Confirmation Number is #382498178.
        </AlertDescription>
      </Box>
      {/* <CloseButton
        alignSelf='flex-start'
        position='relative'
        right={-1}
        top={-1}
        onClick={onClose}
      /> */}
    </Alert>
  ) : (
    <Button marginTop='2em' marginBottom='20px' colorScheme="red" mr={3} onClick={onOpen}>
      Process Order
    </Button>
  );
}
