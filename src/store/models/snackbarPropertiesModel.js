import { action } from 'easy-peasy'

export const snackbarPropertiesModel = {
  snackbarProps: {
    typeMessage: null,
    open: false,
    vertical: null,
    horizontal: null,
    duration: 0,
    message: null,
  },
  setOpen: action((state, payload) => {
    state.snackbarProps = { ...state.snackbarProps, ...payload }
  }),
  setCallSnackbar: action((state, payload) => {
    state.snackbarProps = { ...state.snackbarProps, ...payload }
  }),
  clearSnackbar: action((state) => {
    state.snackbarProps = {
      ...state.snackbarProps,
      typeMessage: null,
      open: false,
      vertical: null,
      horizontal: null,
      duration: 0,
      message: null,
    }
  }),
}
