import React from 'react';
import GetIMG from './ObjdectMod.js';
import { Button, ButtonGroup } from '@chakra-ui/react';
import { useBoolean } from '@chakra-ui/react';
import { Radio, RadioGroup } from '@chakra-ui/react';
import { Stack, HStack, VStack } from '@chakra-ui/react';


export function Toggle3D () {

    // const [flag, setFlag] = useBoolean()
    const [value, setValue] = React.useState('');

    return (
        <div>
           {/* <div onMouseEnter={setFlag.on} onMouseLeave={setFlag.off}>
      {flag ? 'The flag is ON!' : 'Hover me to turn ON'}
    </div> */}
    <RadioGroup onChange={setValue} value={value}>
      <Stack direction='row'>
        <Radio value='No mir'>Mirror On</Radio>
        <Radio value='mir'>Mirror Off</Radio>
      </Stack>
    </RadioGroup>
    <div><GetIMG imageToDisplay={value}/> </div>
        </div>
    );
}

export default Toggle3D;