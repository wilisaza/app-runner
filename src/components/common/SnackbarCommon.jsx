import React from "react";
import { Snackbar, Slide, Alert } from "@mui/material";

const TransitionUp = (props) => {
  return <Slide {...props} direction="left" />;
};
const SnackbarCommon = ({
  typeMessage,
  open,
  vertical,
  horizontal,
  duration,
  setOpen,
  message,
}) => {
  if (typeMessage !== "normal") {
    return (
      <Snackbar
        sx={{ width: "320px" }}
        open={open}
        anchorOrigin={{ vertical, horizontal }}
        autoHideDuration={duration}
        onClose={() => {
          setOpen({ open: false });
        }}
        TransitionComponent={TransitionUp}
      >
        <Alert
          onClose={() => {
            setOpen({ open: false });
          }}
          elevation={6}
          variant="filled"
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          severity={typeMessage}
        >
          {message}
        </Alert>
      </Snackbar>
    );
  }

  return (
    <Snackbar
      open={open}
      anchorOrigin={{ vertical, horizontal }}
      autoHideDuration={duration}
      onClose={() => {
        setOpen({ open: false });
      }}
      TransitionComponent={TransitionUp}
      message={message}
    />
  );
};

export default SnackbarCommon;
