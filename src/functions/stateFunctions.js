export const handleChangeObject = (varSetState, varKey, varValue) =>{
    varSetState((prevState)=>({
        ...prevState,
        [varKey]: varValue
    }))
  }