import React from 'react';
import {Stack, Checkbox, CheckboxGroup } from '@chakra-ui/react';

function Facets() {
    let facets= [
        {
            'Category': 'Brand', 
            'Facet': ['Honda', 'Volvo', 'OEM']
        }, 

        {
            'Category': 'Year', 
            'Facet' : ['2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023']
        }, 
        {
            'Category': 'Size', 
            'Facet' : ['Small', 'Medium', 'Large']
        }
    ]
    const Categories = (facetList) => {
        facetList.forEach(element => {
            console.log(element.Category);
            printCategory(element.Category);
        });
        return 
    }
    const printCategory = (category) => {
        return(
            <h1>{category}</h1>
        );
    }
    return(
        // <div className='facet-container'>
            
        //     <Stack spacing={5} direction='column'>
        //         <Checkbox colorScheme='blue' defaultChecked>
        //         </Checkbox>
        //         <Checkbox colorScheme='blue' defaultChecked>
        //         </Checkbox>
        //     </Stack>
        // </div>
        <div>
            <Stack spacing={5} direction='row'>
                {/* <FacetCategory cats={facets} /> */}
                {Categories(facets)}

            </Stack>

       </div>

    );
}

// function FacetCategory(props){
//     const mylist = props.cats;
//     mylist.forEach(element => {
//         console.log(props.cats.Category);
//     });
// }



export default Facets;