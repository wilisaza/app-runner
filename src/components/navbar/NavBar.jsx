import React from "react";
import SnackbarCommon from "../common/SnackbarCommon";
import { useStoreActions, useStoreState } from "easy-peasy";

const NavBar = () => {
  const snackbarProps = useStoreState(
    (state) => state.snackbarCommon.snackbarProps
  );
  const setOpen = useStoreActions((actions) => actions.snackbarCommon.setOpen);

  return (
    <>
      {snackbarProps.open && (
        <SnackbarCommon
          typeMessage={snackbarProps.typeMessage}
          open={snackbarProps.open}
          vertical={snackbarProps.vertical}
          horizontal={snackbarProps.horizontal}
          duration={snackbarProps.duration}
          setOpen={() => {
            setOpen({ ...snackbarProps, open: false });
          }}
          message={snackbarProps.message}
        />
      )}
    </>
  );
};

export default NavBar;
