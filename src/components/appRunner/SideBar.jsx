import { Drawer, Box, IconButton, Tooltip } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";

const SideBar = (props) => {
  const dark = "light";

  const { setStateSideBar, setStateButton } = props;

  return (
    <>
      <Box
        sx={{
          left: props.stateSideBar ? "258px" : "-10px",
          zIndex: "3",
          borderRadius: "50%",
          backgroundColor: dark === "dark" ? "#121212" : "#FFFFFF",
          position: "fixed",
          top: "140px",
        }}
      >
        {props.stateSideBar ? (
          <Tooltip
            title={props.stateButton ? "CONTRAER" : "EXPANDIR"}
            placement="right"
            arrow
          >
            {props.stateButton ? (
              <IconButton
                onClick={() => {
                  setStateSideBar(false);
                  //   setStateButton();
                }}
                sx={{
                  border:
                    dark === "dark"
                      ? "solid 1px #757575"
                      : "solid 2px rgba(0, 0, 0, 0.12)",
                }}
              >
                <NavigateBeforeIcon
                  sx={{
                    minWidth: "25px",
                    minHeight: "25px",
                    borderRadius: "50%",
                  }}
                />
              </IconButton>
            ) : (
              <IconButton
                onClick={() => {
                  if (!props.stateSideBar) {
                    setStateSideBar(false);
                  }
                  //   setStateButton();
                }}
                // onMouseLeave={() => {
                //   if (!props.stateButton) {
                //     props.setStateSideBar();
                //   }
                // }}
                color="primary"
                sx={{
                  border:
                    dark === "dark"
                      ? "solid 1px #757575"
                      : "solid 2px rgba(0, 0, 0, 0.12)",
                }}
              >
                <NavigateNextIcon
                  sx={{
                    minWidth: "25px",
                    minHeight: "25px",
                    borderRadius: "50%",
                  }}
                />
              </IconButton>
            )}
          </Tooltip>
        ) : (
          <>
            <Box
              //   onMouseEnter={props.setStateSideBar}
              onClick={props.setStateSideBar}
              sx={{
                borderRight: "solid 2px rgba(0, 0, 0, 0.12)",
                position: "fixed",
                top: "70px",
                bottom: "0",
                width: "22px",
              }}
            />
            <Tooltip title="EXPANDIR" placement="right" arrow>
              <IconButton
                onClick={() => {
                  if (!props.stateSideBar) {
                    setStateSideBar(true);
                  }
                  //   setStateButton();
                }}
                sx={{
                  border:
                    dark === "dark"
                      ? "solid 1px #757575"
                      : "solid 2px rgba(0, 0, 0, 0.12)",
                  position: "fixed",
                  top: "140px",
                  left: "-10px",
                  backgroundColor: dark === "dark" ? "#121212" : "#FFFFFF",
                  "&:hover": {
                    backgroundColor: dark === "dark" ? "#272727" : "#DFDFDF",
                  },
                }}
                color="primary"
              >
                <NavigateNextIcon
                  sx={{
                    minWidth: "25px",
                    minHeight: "25px",
                    borderRadius: "50%",
                  }}
                />
              </IconButton>
            </Tooltip>
          </>
        )}
      </Box>
      <Drawer
        transitionDuration={500}
        width="auto"
        variant="persistent"
        anchor="left"
        open={props.stateSideBar}
        onClose={props.setStateSideBar}
        sx={{
          "& .MuiDrawer-paper": {
            zIndex: "2",
            top: "73px",
            width: "280px",
          },
        }}
      >
        {props.children}
      </Drawer>
    </>
  );
};

export default SideBar;
