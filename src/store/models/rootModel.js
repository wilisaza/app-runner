import { persist } from "easy-peasy";
import { appLoginModel } from "./appLoginModel";
import { snackbarPropertiesModel } from "./snackbarPropertiesModel";

export const rootModel = {
  appLogin: persist(appLoginModel),
  snackbarCommon: persist(snackbarPropertiesModel),
};
