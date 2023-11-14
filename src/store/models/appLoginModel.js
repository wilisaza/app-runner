import { action } from 'easy-peasy'

export const appLoginModel = {
  appLoginData: undefined,
  setAppLoginData: action((state, payload) => {
    state.appLoginData = payload
  }),
  clearUserData: action((state) => {
    state.appLoginData = undefined
  }),
}