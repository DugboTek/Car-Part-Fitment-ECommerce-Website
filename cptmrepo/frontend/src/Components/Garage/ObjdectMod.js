import React from 'react';
import NoMir from './NoMirror.js';
import Mir from './WithMirror.js';


export function ObdectMod ({imageToDisplay}) {

    if(imageToDisplay == 'No mir'){
        return (<NoMir/>);
    } else {
        return(<Mir/>);
    }

}

export default ObdectMod;