export const keyExists = (obj={}, key) => {
  return obj.hasOwnProperty(key)
};

export const addKey = (obj={}, key, keyVal) =>{
  obj[key]=keyVal
  return obj;
}

export const isEmpty = (value) => {
  return value === undefined || value === null || value === "";
};

export const valKeys = (obj, key, err) => {
  let countError = 0;
  for (let i in key) {
    if (!keyExists(obj, key[i])) {
      countError++;
      err[countError] = `No ${key[i]}`;
    }
  }
  if (!countError) {
    return true;
  } else {
    return false;
  }
};

export const objCompare = (obj1, obj2) => {
  const Obj1_keys = Object.keys(obj1);
  const Obj2_keys = Object.keys(obj2);
  if (Obj1_keys.length !== Obj2_keys.length) {
    return false;
  }
  for (let k of Obj1_keys) {
    if (obj1[k] !== obj2[k]) {
      return false;
    }
  }
  return true;
};

export const objCompareRec = (obj1, obj2) => {
  const Obj1_keys = Object.keys(obj1);
  const Obj2_keys = Object.keys(obj2);
  if (Obj1_keys.length !== Obj2_keys.length) {
    return false;
  }
  for (let k of Obj1_keys) {
    if (typeof obj1[k] === "object" && typeof obj2[k] === "object") {
      if (!objCompareRec(obj1[k], obj2[k])) {
        return false;
      }
    } else {
      if (typeof obj1[k] !== typeof obj2[k]) {
        return false;
      }
      if (obj1[k] !== obj2[k]) {
        return false;
      }
    }
  }
  return true;
};
