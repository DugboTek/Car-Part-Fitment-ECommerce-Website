import { Card, CardHeader, CardBody, CardFooter } from '@chakra-ui/react';
import { Text } from '@chakra-ui/react';


export default NoResults()= () => {
return(<Card>
    <CardBody>
       <Text color='facebook' fontSize='4xl'>No search results available. Please try another search.</Text>
    </CardBody>
  </Card>);
}