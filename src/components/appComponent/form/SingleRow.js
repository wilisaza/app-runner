import { Box, Grid } from "@mui/material";
import { useState, useEffect, memo } from "react";
import DataElement from "./DataElement";
import { objCompare } from "@/functions/arrayFunctions";
import { handleChangeObject } from "@/functions/stateFunctions";

function SingleRow({
  dataElements,
  recordData,
  blockData,
  setBlockData,
  displayPosition,
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
    <Box
      mt={
        1
      } /*sx={{backgroundColor: displayPosition===recordPosition ? 'grey.100' : 'white' }} */
    >
      <Grid
        container
        spacing={1}
      >
        {dataElements && dataElements.length ? (
          dataElements.map((e, index) => {
            return (
              <DataElement
                key={index}
                elementStruct={e}
                elementData={currentRecord[e["dataName"]]}
                onChangeElement={handleChange}
                displayPosition={displayPosition}
              />
            );
          })
        ) : (
          <></>
        )}
      </Grid>
    </Box>
  );
}

export default memo(SingleRow);
