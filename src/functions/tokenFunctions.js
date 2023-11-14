import jwtDecode from "jwt-decode";

export const decodeInToken =  (inToken) => {
  try {
    let decoded =  jwtDecode(inToken);
    return { success: true, data: decoded };
  } catch (error) {
    return {
      success: false,
      error: error.message,
    };
  }
};

