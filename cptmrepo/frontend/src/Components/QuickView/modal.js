import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
  } from '@chakra-ui/react';
  import { useDisclosure } from '@chakra-ui/react';
  import { Button } from '@chakra-ui/react';
  import ItemSpecs from './ItemSpecs.js';


function BasicUsage() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
      <>
        <Button bg='#004E97' color='white' onClick={onOpen}>Quick View</Button>
  
        <Modal size={'xl'} isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalCloseButton />
            <ModalBody>
              <ItemSpecs></ItemSpecs>
            </ModalBody>
          </ModalContent>
        </Modal>
      </>
    )
  }

  export default BasicUsage;