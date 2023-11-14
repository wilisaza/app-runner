import jwt from "jsonwebtoken";
import jwtDecode from "jwt-decode";
import { JWT_SECRET, LAUNCH_SECRET } from "../constants";

export const validateLaunchToken = (launchToken) => {
  try {
    let decoded = jwt.verify(launchToken, LAUNCH_SECRET);
    return { success: true, data: decoded };
  } catch (error) {
    return {
      success: false,
      error: error.message,
    };
  }
};

export const validateInToken =  (inToken) => {
  console.log('sexo',inToken)
  console.log('anal',JWT_SECRET)
  let decoded =  jwtDecode(inToken);
  try {
    return { success: true, data: decoded };
  } catch (error) {
    return {
      success: false,
      error: error.message,
    };
  }
};

