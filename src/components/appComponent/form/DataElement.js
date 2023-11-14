import { useEffect, useState, memo } from "react";
import { Grid, TextField } from "@mui/material"
import FormControl from '@mui/joy/FormControl'
import FormLabel from '@mui/joy/FormLabel'
import FormHelperText from '@mui/joy/FormHelperText'
import Input from '@mui/joy/Input'
import { isEmpty } from "@/functions/arrayFunctions"
import '@fontsource/public-sans';


function DataElement({elementStruct, elementData, onChangeElement, showLabel, displayPosition, recordPosition}) {
  const valIni = elementData;
  const [currentVal, setCurrentVal] = useState(elementData);
  const [modVal, setModVal] = useState(false);
  
  useEffect(() => {
    setCurrentVal(elementData)
  }, [elementData])
  

  useEffect(() => {
    if (valIni !== currentVal) {
      setModVal(true);
    } else {
      setModVal(false);
    }
    //setCurrentVal(elementData)
  }, [currentVal]);
  //console.log('currentVal',currentVal, elementData)
  return (
    <Grid item xs={12} sm={2} >
      <FormControl 
        size='sm'>
          { showLabel ? <FormLabel>{elementStruct.prompt}</FormLabel> : <></> }
          <Input 
            sx={{ 
              '--Input-radius': '1px',
              '--Input-minHeight': '20px'
             }}
            size = 'sm'
            color= { displayPosition===recordPosition ? 'primary' : 'neutral'}
            name={elementStruct.dataName}
            value={!isEmpty(currentVal) ? currentVal : '' }
            onChange={(e)=> setCurrentVal(e.target.value)}
            onBlur={onChangeElement}
            //fullWidth 
            />
      </FormControl>
    </Grid>
  )
}

export default memo(DataElement)