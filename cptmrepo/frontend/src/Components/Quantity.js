//Bella White
import React, { useState } from 'react'
import { Grid, GridItem } from '@chakra-ui/react';


export default function RSVP() {
  const [count, setCount] = useState(1)
  const maxGuests = 100
  const minGuests = 1

  const handleCount = (e) => {
    if (e > maxGuests) {
      setCount(maxGuests)
    } else if (e < minGuests) {
      setCount(minGuests)
    } else setCount(e)
  }

  const decrementCount = () => {
    if (count > minGuests) setCount(count - 1)
  }

const incrementCount = () => {
    if (count < maxGuests) setCount(count + 1)
    else if (count > maxGuests) setCount(maxGuests)
  }
  return (

    <div>
      <Grid w='5em' h='17px' templateColumns='repeat(3, 1fr)' gap={0}>
          <GridItem color='black' alignContent='center' border='2px'>
            <input
              type='button'
              onClick={() => decrementCount()}
              value='  -  '
              className='cursor-pointer'
            />
            </GridItem>

            <GridItem color='black' alignContent='center' border='2px'>
            <input
            style={{width: "1.5em"}}
              required
              type='number'
              name='counter'
              value={count}
              onChange={(event) => {
                handleCount(event.target.value)
              }}
            />
            </GridItem>

            <GridItem color='black' alignContent='center' border='2px'>
            <input
              type='button'
              onClick={() => incrementCount()}
              value='  +  '
              className='cursor-pointer'
            />
            </GridItem>
      </Grid>
    </div>
  )
}
