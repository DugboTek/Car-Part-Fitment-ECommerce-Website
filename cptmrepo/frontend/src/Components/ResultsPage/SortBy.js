// Ali Moulton
import {
    Select
  } from '@chakra-ui/react'
  import "../../Styles/main.css"
//   import "../Styles/SortBy.css"


  function SortBy() {
    return (
        <Select 
            w="175px"
            variant="outline" 
            placeholder='Sort Results'
            chakraStyles={{
                container: (provided) => ({
                    ...provided, 
                    width: "100px"
                })
            }}
        >
            <option value='rel'> Relevance</option>
            <option value='low-high'> Price: Low to High</option>
            <option value='high-low'>Price: High to Low</option>
      </Select>   
    );
  } 

  export default SortBy;




  