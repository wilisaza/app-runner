import { Box, Button, Grid, TextField } from "@mui/material";
import DataRecord from "./DataRecord";
import { useState, useEffect } from "react";
import blockFunctions from "@/functions/blockFunctions";
import { TableDataGrid } from "./TableDataGrid";
import SingleRow from "./SingleRow";

function DataBlock({
  appLogin,
  blockStruct,
  toolButtons,
  disableButton,
  setWait,
  renderCondition,
}) {
  const [dbData, setDbData] = useState([]);
  const [blockData, setBlockData] = useState([]);
  const [displayPosition, setDisplayPosition] = useState(1);
  const [dataPosition, setDataPosition] = useState(1);
  const [searchObject, setSearchObject] = useState({});
  const [tmpBlockData, setTmpBlockData] = useState([]);

  const cursorRecordInit = 1;
  const cursorRecordEnd = blockStruct.recordsDisplayCount;

  /**
   * UseEffect que controla el llamado de acción de los botones para el bloque de datos
   */
  useEffect(() => {
    (async function buttonAction() {
      if (toolButtons.save) {
        setWait(true);
        await blockFunctions.saveData(
          blockStruct,
          appLogin,
          blockData,
          setBlockData
        );
        setWait(false);
        disableButton("save");
      }

      if (toolButtons.add) {
        //setWait(true)
        blockFunctions.newRecord(blockStruct, 4, blockData, setBlockData);
        //setWait(false)
        disableButton("add");
      }

      if (toolButtons.search) {
        //setWait(true)
        //blockFunctions.newRecord(blockStruct, 4, blockData, setBlockData);
        console.log('search')
        setTmpBlockData(blockData)
        setBlockData([])
        disableButton("search");
        //setWait(false)
        
      }

      if (toolButtons.cancelSearch) {
        //setWait(true)
        //blockFunctions.newRecord(blockStruct, 4, blockData, setBlockData);
        console.log('cancelSearch')
        if(tmpBlockData.length){
          setBlockData(tmpBlockData)
        }
        disableButton("cancelSearch");
        //setWait(false)
        
      }

      if (toolButtons.query) {
        setWait(true);
        await blockFunctions.peticionGet(blockStruct, appLogin).then((data) => {
          if (data.success) {
            setDbData(data.data);
            setTmpBlockData([])
          }
          /**
           * Acá código de despliegue de error de get
           */
        });
        disableButton("query");
        setWait(false);
      }

      if (toolButtons.prev) {
        if (displayPosition > cursorRecordInit) {
          setDisplayPosition(displayPosition - 1);
        }
        if (
          dataPosition > cursorRecordInit &&
          displayPosition == cursorRecordInit
        ) {
          setDataPosition(dataPosition - 1);
        }
        disableButton("prev");
      }

      if (toolButtons.next) {
        if (displayPosition < Math.min(cursorRecordEnd, blockData.length)) {
          setDisplayPosition(displayPosition + 1);
        }
        if (
          dataPosition < blockData.length - cursorRecordEnd + 1 &&
          displayPosition == cursorRecordEnd
        ) {
          setDataPosition(dataPosition + 1);
        }
        disableButton("next");
      }
    })();
  }, [toolButtons]);

  useEffect(() => {
    if (dbData.length) {
      let tmpData = [];
      dbData.map((d, index) => {
        tmpData.push({
          id: index,
          initRecord: d,
          currentRecord: d,
          modAction: "NONE",
          actionLog: "",
        });
      });
      setBlockData(tmpData);
    }
  }, [dbData]);

  if (!blockStruct?.dataElements) {
    return (
      <>
        <h6>No dataElements</h6>
      </>
    );
  }
  console.log("blockData", blockData);
  console.log(
    "diaplayPosition - dataPosition",
    displayPosition,
    dataPosition,
    blockData.length
  );
  const { dataElements } = blockStruct;
  console.log("dataElements", dataElements);
  let dataBlocks = [];
  if (renderCondition === "GRID_ROW") {
    for (let i = 0; i < (blockStruct.recordsDisplayCount || 0); i++) {
      dataBlocks.push(
        <DataRecord
          key={i + 1}
          recordPosition={i + 1}
          recordData={blockFunctions.extractData(
            blockData,
            i + (dataPosition - 1)
          )}
          dataElements={dataElements}
          blockData={blockData}
          setBlockData={setBlockData}
          displayPosition={displayPosition}
          setDisplayPosition={setDisplayPosition}
          showLabel={i === 0 ? true : false}
          renderCondition={renderCondition}
        />
      );
    }
  }
  
  return (
    <Box
    mt={1}
    sx={{ border: 1, borderColor: "grey.300", borderRadius: 1, padding: 1 }}
  >
    {
      renderCondition === "DATAGRID" ? 
      ( <TableDataGrid dataElements={dataElements} blockData={blockData} /> ) : 
      (
        renderCondition === "SINGLE_ROW" ?
        ( <DataRecord key={1} recordPosition={1} recordData={blockFunctions.extractData(blockData, dataPosition )} dataElements={dataElements} blockData={blockData}
          setBlockData={setBlockData}
          displayPosition={displayPosition}
          setDisplayPosition={setDisplayPosition}
          showLabel={true }
          renderCondition={renderCondition}
        /> ) : 
        ( dataBlocks )
      )
    }
  </Box>
  );
}

export default DataBlock;
