import { useState, useEffect } from "react";
import {
  Backdrop,
  Box,
  CircularProgress,
  Container,
  Grid,
} from "@mui/material";
import ToolBar from "./ToolBar";
import DataBlock from "./DataBlock";
import { useStoreState } from "easy-peasy";
import { handleChangeObject } from "@/functions/stateFunctions";

const Form = ({ specification }) => {
  const [query, setQuery] = useState(false);
  const [toolButtons, setToolButtons] = useState({
    save: false,
    add: false,
    search: false,
    cancelSearch: false,
    query: false,
    delete: false,
    next: false,
    prev: false,
    exit: false,
  });
  const [wait, setWait] = useState(false);

  useEffect(() => {
    (async function buttonAction() {
      if (toolButtons.exit) {
        console.log("Exit Form");
      }
    })();
  }, [toolButtons]);

  const appLogin = useStoreState((state) => state.appLogin.appLoginData);

  const enableButton = (button) => {
    handleChangeObject(setToolButtons, button, true);
  };

  const disableButton = (button) => {
    handleChangeObject(setToolButtons, button, false);
  };

  const { dataBlocks } = specification;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Box
        mt={1}
        sx={{ border: 1, borderColor: "grey.300", borderRadius: 1, padding: 1 }}
      >
        <ToolBar
          renderCondition={
            dataBlocks.length > 0 ? dataBlocks[0].displayMethod : ""
          }
          componentTitle={specification.title}
          enableButton={enableButton}
        />
        <Grid container rowSpacing={1} columnSpacing={1}>
          {dataBlocks && dataBlocks.length ? (
            dataBlocks.map((dB, index) => {
              return (
                <Grid key={index} item xs={12}>
                  {" "}
                  {/* Acá debe leer estructura para despliegue */}
                  <DataBlock
                    key={`dataBlock-${index}`}
                    appLogin={appLogin}
                    blockStruct={dB}
                    query={query}
                    renderCondition={
                      dataBlocks.length > 0 ? dataBlocks[0].displayMethod : ""
                    }
                    handleChange={handleChange}
                    toolButtons={toolButtons}
                    disableButton={disableButton}
                    setWait={setWait}
                  />
                </Grid>
              );
            })
          ) : (
            <>
              <h6>No form</h6>{" "}
            </>
          )}
        </Grid>
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={wait}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </Box>
    </>
  );
};

export default Form;
