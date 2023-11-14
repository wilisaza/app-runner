import { Box, Grid, TextField, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { useState, useEffect, memo } from "react";
import DataElement from "./DataElement";
import { objCompare } from "@/functions/arrayFunctions";
import { handleChangeObject } from "@/functions/stateFunctions";

function DataRecord({
  dataElements,
  recordPosition,
  recordData,
  blockData,
  setBlockData,
  displayPosition,
  setDisplayPosition,
  showLabel,
  renderCondition,
}) {
  const [currentRecord, setCurrentRecord] = useState(recordData);

  useEffect(() => {
    if (recordData) {
      setCurrentRecord(recordData.currentRecord ?? {});
    }
  }, [recordData]);

  //handleChangeObject(setDataLogin,'loginPrev',true)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentRecord((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    let tmpRecordData = recordData;
    if (!objCompare(recordData.initRecord, currentRecord)) {
      //son diferentes

      if (!Object.keys(recordData.initRecord).length) {
        // objeto vacío
        tmpRecordData.modAction = "INSERT";
      }
      if (Object.keys(recordData.initRecord).length) {
        // objeto vacío
        if (
          recordData.modAction === "NONE" ||
          recordData.modAction === "UPDATE"
        )
          tmpRecordData.modAction = "UPDATE";
      }
    }

    if (objCompare(recordData.initRecord, currentRecord)) {
      //son iguales
      tmpRecordData.modAction = "NONE";
    }

    tmpRecordData.currentRecord = currentRecord;

    setBlockData(
      blockData.map((row) =>
        row["id"] === tmpRecordData["id"] ? tmpRecordData : row
      )
    );
  };
  //console.log("Elemento Actual DataRecord", currentRecord, displayPosition, recordPosition);
  return (
    <Box mt={1} /*sx={{backgroundColor: displayPosition===recordPosition ? 'grey.100' : 'white' }} */ >
      {renderCondition === "GRID_ROW" ? (
      <Grid
        container
        spacing={1}
        onMouseDown={() => setDisplayPosition(recordPosition)}
      >
        {dataElements && dataElements.length ? (
          dataElements.map((e, index) => {
            return (
              <DataElement
                key={index}
                elementStruct={e}
                elementData={currentRecord[e["dataName"]]}
                onChangeElement={handleChange}
                showLabel={showLabel}
                displayPosition={displayPosition}
                recordPosition={recordPosition}
              />
            );
          })
        ) : (
          <></>
        )}
      </Grid>) : (
       <Box sx={{ flexGrow: 1 }}>
       <Grid container spacing={1} columns={120}>
         <Grid item md={120}>  
           <Grid container spacing={1} columns={120}>
             <Grid item xs={6} md={10}>
               <TextField
                   label="Nro. Doc."
                   id="nroDoc"
                   defaultValue=""
                   size="small"
                 />
             </Grid>
             <Grid item xs={6} md={25}>
               <TextField
                   label="Prefijo"
                   id="prefijo"
                   defaultValue=""
                   size="small"
                 />
             </Grid>
             <Grid item xs={6} md={25}>
               <FormControl fullWidth size="small">
               <InputLabel id="estado">Estado</InputLabel>
               <Select
                 labelId="estado"
                 id="estado"
                 label="Estado"
                 value={0}
                 onChange={(e) => console.log(e.target.value)}
               >
                 <MenuItem value={10}>Ten</MenuItem>
                 <MenuItem value={20}>Twenty</MenuItem>
                 <MenuItem value={30}>Thirty</MenuItem>
               </Select>
               </FormControl>
             </Grid>
             <Grid item xs={6} md={20}>
               <TextField
                   label="Fecha"
                   id="fecha"
                   defaultValue=""
                   size="small"
                 />
             </Grid>
             <Grid item xs={6} md={10}>
               <TextField
                   label="Nro. Int."
                   id="nroInt"
                   defaultValue=""
                   size="small"
                 />
             </Grid>
           </Grid>
         </Grid>
         <Grid item md={120}>  
           <Grid container spacing={1} columns={120}>
             <Grid item xs={6} md={100}>
               <TextField
                   fullWidth
                   label="Concepto"
                   id="concepto"
                   defaultValue=""
                   multiline
                   rows={4}
                   size="small"
                 />
             </Grid>
           </Grid>
         </Grid>
       </Grid>
     </Box>
      )
      }
    </Box>
  );
}

export default memo(DataRecord);
