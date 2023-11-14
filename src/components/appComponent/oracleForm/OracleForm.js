import React from "react";

import {
  Box,
  FormControl,
  InputLabel,
  OutlinedInput,
  Typography,
} from "@mui/material";
import ToolBar from "./ToolBar";

function OracleForm({ specification }) {
  const { Canvas, Window } = specification.Module.FormModule;
  const dataForRender = specification?.Module?.FormModule.Block;

  const reescale = 2;

  if (Array.isArray(dataForRender)) {
    return (
      <Box
        display="flex"
        width="100%"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        <ToolBar width={`${Window["-Width"] * reescale}px`} />

        <Box
          width={`${Window["-Width"] * reescale}px`}
          height={`${Window["-Height"] * reescale}px`}
          position="relative"
          backgroundColor="#E4E4E4"
          sx={
            {
              // "&:hover": {
              //   backgroundColor: "primary.main",
              //   opacity: [0.9, 0.8, 0.7],
              // },
            }
          }
        >
          {Canvas.Graphics.map((elementGraphics, index) => {
            return (
              <Box
                key={index}
                component="span"
                position="absolute"
                top={`${elementGraphics["-YPosition"] * reescale}px`}
                left={`${elementGraphics["-XPosition"] * reescale}px`}
              >
                <Typography fontSize="10px">
                  {elementGraphics["-FrameTitle"]}
                </Typography>
              </Box>
            );
          })}

          {dataForRender.map((elementBlock) => {
            return elementBlock.Item.map((elementItem, index) => {
              return (
                <Box
                  key={index}
                  position="absolute"
                  display={elementItem["-ItemsDisplay"] ? "" : "none"}
                  top={`${elementItem["-YPosition"] * reescale}px`}
                  left={`${elementItem["-XPosition"] * reescale}px`}
                  width={`${elementItem["-Width"] * reescale}px`}
                  height={`${elementItem["-Height"] * reescale}px`}
                  backgroundColor={`${elementItem["-BackColor"]}`}
                  borderRadius="4px"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      width: `${elementItem["-Width"] * reescale}px`,
                      height: `${elementItem["-Height"] * reescale}px`,
                      fontSize: "8px",
                    },
                    "& .MuiOutlinedInput-root .MuiInputBase-input": {
                      padding: "0px 4px",
                    },
                  }}
                >
                  {/* <TextField
                      key={elementItem["-Name"]}
                      label={elementItem["-Prompt"]}
                      InputLabelProps={{ shrink: true, fontSize: "10px" }}
                      sx={{
                        "& .MuiInputLabel-root": {
                          fontSize: "10px",
                        },
                        marginRight: "8px",
                      }}
                    /> */}
                  {elementItem["-ItemType"] === "Elemento de Texto" ? (
                    <FormControl fullWidth>
                      <InputLabel
                        sx={{
                          left: "-15px",
                          fontSize: "10px",
                          minWidth: "60px",
                          width: `${elementItem["-Width"] * reescale}px`,
                          textAlign: "center",
                          "&  .MuiOutlinedInput-input": {
                            padding: "0px 0px",
                          },
                        }}
                        shrink={true}
                      >
                        {elementItem["-Prompt"]}
                      </InputLabel>
                      <OutlinedInput fullWidth />
                    </FormControl>
                  ) : (
                    <Typography fontSize="10px" variant="body1">
                      {elementItem["-Prompt"]}
                    </Typography>
                  )}
                </Box>
              );
            });
          })}
        </Box>
      </Box>
    );
  }

  return (
    <Box
      display="flex"
      width="100%"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <ToolBar width={`${Window["-Width"] * reescale}px`} />

      <Box
        width={`${Window["-Width"] * reescale}px`}
        height={`${Window["-Height"] * reescale}px`}
        position="relative"
        backgroundColor="#E4E4E4"
        sx={
          {
            // "&:hover": {
            //   backgroundColor: "primary.main",
            //   opacity: [0.9, 0.8, 0.7],
            // },
          }
        }
      >
        <Box
          component="span"
          position="absolute"
          top={`${Canvas.Graphics["-XPosition"] * reescale}px`}
          left={`${Canvas.Graphics["-YPosition"] * reescale}px`}
        >
          <Typography fontSize="10px">
            {Canvas.Graphics["-FrameTitle"]}
          </Typography>
        </Box>
        {dataForRender.Item.map((element) => {
          return (
            <Box
              key={element["-Name"]}
              position="absolute"
              display={element["-ItemsDisplay"] ? "" : "none"}
              top={`${element["-YPosition"] * reescale}px`}
              left={`${element["-XPosition"] * reescale}px`}
              width={`${element["-Width"] * reescale}px`}
              height={`${element["-Height"] * reescale}px`}
              backgroundColor={`${element["-BackColor"]}`}
              borderRadius="4px"
              sx={{
                "& .MuiOutlinedInput-root": {
                  width: `${element["-Width"] * reescale}px`,
                  height: `${element["-Height"] * reescale}px`,
                  fontSize: "10px",
                },
              }}
            >
              {/* <TextField
                InputLabelProps={{ shrink: true, fontSize: "10px" }}
                sx={{
                  "& .MuiInputLabel-root": {
                    fontSize: "10px",
                  },
                }}
              /> */}
              {element["-ItemType"] === "Elemento Mostrado" ? (
                <FormControl>
                  <InputLabel sx={{ fontSize: "10px" }} shrink={true}>
                    {element["-Prompt"]}
                  </InputLabel>
                  <OutlinedInput />
                </FormControl>
              ) : (
                <Typography fontSize="10px" variant="body1">
                  {element["-Prompt"]}
                </Typography>
              )}
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}

export default OracleForm;
