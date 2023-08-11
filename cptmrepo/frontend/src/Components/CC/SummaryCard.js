//Bella White
import { Card, CardHeader, CardBody, CardFooter } from "@chakra-ui/react";
import { Heading } from "@chakra-ui/react";
import { Stack, HStack, VStack } from "@chakra-ui/react";
import { Box } from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";
import { Button, ButtonGroup } from "@chakra-ui/react";
import { Grid, GridItem } from "@chakra-ui/react";

export default function SummaryCard({ cart }) {
  return (
    <>
      <Card>
        <CardHeader>
          <Heading size="md">Order Summary</Heading>
        </CardHeader>

        <CardBody>
          <Stack spacing="4">
            <div> {cart}</div>
            <Box>
              <Text marginRight="2em" pt="2" fontSize="sm">
                All parts are nonrefundable and may not be returned -- call
                customer service for inquires
              </Text>
            </Box>
            <Box>
              <Heading size="xs" textTransform="uppercase">
                Order Total Price:
              </Heading>
              <Card>
                <CardBody>
                  <Grid templateColumns="repeat(2, 1fr)" gap={6}>
                    <GridItem w="100%">
                      <Text color="tomato" as="b" fontSize="4xl">
                        $399.36
                      </Text>
                    </GridItem>
                    <GridItem w="100%" marginLeft="4.5em" alignContent="left">
                      <Button colorScheme="green">Continue To Pay</Button>
                    </GridItem>
                  </Grid>
                </CardBody>
              </Card>
            </Box>
          </Stack>
        </CardBody>
      </Card>
    </>
  );
}
