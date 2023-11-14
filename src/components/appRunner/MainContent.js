import { useState } from "react";
import {Box, Tab} from '@mui/material';
import {TabContext, TabList, TabPanel} from '@mui/lab';
import Component from "../appComponent/Component";

/*muestra estructura openTabs
  {
    position: 1,
    title: 'Item Prueba 1',
    contentType: 'FORM',
    content: 'Contenido de prueba 1'
  },
*/

function MainContent({openTabs, setOpenTabs}) {
  const [value, setValue] = useState('1');
  
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  
  return (
    <>
    {openTabs.length >0  ? 
      <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            {openTabs.map((oT, index) => {return(<Tab key={index} label={oT.description} value={(index+1).toString()} />)})}
          </TabList>
        </Box>
        {openTabs.map((oT, index) => {return(<TabPanel key={index} value={(index+1).toString()}>
          <Component key={`component-${index}`}componentType={oT.componentType} specification={oT.specification} />
          </TabPanel>)})}
      </TabContext>
    </Box>:
  <></>}
  </>  
  );
  
}

export default MainContent