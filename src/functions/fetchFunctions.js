const fetchFunctions = {
  async fetchApi(
    miUrl,
    miMetodo,
    miObjetoDb,
    miParams,
    miQuery,
    miBody,
    miToken,
    miHeader
  ) {
    const urlm =
      miUrl +
      miObjetoDb +
      (miQuery ? "?" + miQuery : miParams ? "/" + miParams : "");
    const head = {
      Authorization: miToken ? `Bearer ${miToken}` : "",
      Accept: "application/json",
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    };
    let fetchParams = {
      method: miMetodo,
      body: JSON.stringify(miBody),
      mode: "cors",
      headers: Object.assign(head, miHeader),
    };
    
    let res = await fetch(urlm, fetchParams)
    let ret = await res.json();
    return ret;
  },

  async fetchApi(miObj) {
    /*
    {
      url: url de acceso del servicio,
      metodo: nombre del método 'GET', 'POST', 'PUT', 'DELETE',
      objetoDb: objeto/ruta en la que se realiza la acción,
      params: variable 'params' de la petición,
      query: variable 'query' de la petición,
      body: variable 'body' de la petición,
      token: uso de token si se requiere,
      header: variable 'headers' de la petición
  }*/
  try {
    const urlm =
      miObj?.url +
      miObj?.objetoDb +
      (miObj?.query ? "?" + miObj.query : miObj.params ? "/" + miObj.params : "");
    const head = {
      Authorization: miObj.token ? `Bearer ${miObj.token}` : "",
      Accept: "application/json",
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    };
    let fetchParams = {
      method: miObj.metodo,
      body: JSON.stringify(miObj.body),
      mode: "cors",
      headers: Object.assign(head, miObj.header),
    };
    console.log('urlm', urlm)
    let res = await fetch(urlm, fetchParams)
    let ret = await res.json();
    return ret;
  } catch (error) {
    return({
      success: false,
      error
    })
  }
    
  },
};

export default fetchFunctions;
