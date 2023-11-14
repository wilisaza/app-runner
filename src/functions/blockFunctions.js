import { ORCL_GENERIC_API } from '@/constants'
import fetchFunctions from "@/functions/fetchFunctions"

const blockFunctions = {
 
  async peticionGet (blockStruct, appLogin, dataQuery = {}) {
    let header = {
      dbuser: appLogin.altUser,
      dbpassword: appLogin.altPassword,
      dbhost: appLogin.clientSpecs.connection.dbHost,
      dbport:appLogin.clientSpecs.connection.dbPort,
      dbsid: appLogin.clientSpecs.connection.dbName,
      iterations:appLogin.iterations
    }
    let fetchObj ={
      url: ORCL_GENERIC_API,
      metodo: 'GET',
      objetoDb: blockStruct.dataOrigin,
      header
    }
    if (Object.keys(dataQuery).length > 0){
      fetchObj.query = dataQuery
    }
    let fetchData = await fetchFunctions.fetchApi(fetchObj)
    
    return fetchData
    
  },
  
  async peticionPost(blockStruct, appLogin, dataBody) {
    let header = {
      dbuser: appLogin.altUser,
      dbpassword: appLogin.altPassword,
      dbhost: appLogin.clientSpecs.connection.dbHost,
      dbport:appLogin.clientSpecs.connection.dbPort,
      dbsid: appLogin.clientSpecs.connection.dbName,
      iterations:appLogin.iterations
    }
    let fetchObj ={
      url: ORCL_GENERIC_API,
      metodo: 'POST',
      objetoDb: blockStruct.dataOrigin,
      header,
      body: dataBody
    }
  
    let fetchData = await fetchFunctions.fetchApi(fetchObj)
    
    return fetchData
    
  },
  
  
  async peticionPut(blockStruct, appLogin, dataQuery, dataBody) {
    let header = {
      dbuser: appLogin.altUser,
      dbpassword: appLogin.altPassword,
      dbhost: appLogin.clientSpecs.connection.dbHost,
      dbport:appLogin.clientSpecs.connection.dbPort,
      dbsid: appLogin.clientSpecs.connection.dbName,
      iterations:appLogin.iterations
    }
    let fetchObj ={
      url: ORCL_GENERIC_API,
      metodo: 'PUT',
      objetoDb: blockStruct.dataOrigin,
      header,
      query: dataQuery,
      body: dataBody
    }
  
    let fetchData = await fetchFunctions.fetchApi(fetchObj)
    
    return fetchData
    
  },

  extractData (data, index) {
    if (index < data.length && index >= 0) {
      return data[index];
    }
    return {};
  },

  async saveData  (blockStruct, appLogin, blockData, setBlockData) {
    let tmpBlockData = blockData
    let body ={}
    let query =''
    let transaction={}
  
    for (let i=0; i< tmpBlockData.length; i++){
      switch(tmpBlockData[i].modAction){
        case 'INSERT':
          body = {}
          blockStruct.dataElements.map((e)=>{
            body[e.dataName]= tmpBlockData[i].currentRecord[e.dataName]
          })
          console.log('body', body)
          transaction = await blockFunctions.peticionPost(blockStruct, appLogin, body)
  
          if (transaction.success){
            tmpBlockData[i].initRecord = tmpBlockData[i].currentRecord
            tmpBlockData[i].modAction = 'NONE'
          }
          console.log('transaction',transaction)
          break;
        case 'UPDATE':
          body = {}
          query= ''
          blockStruct.dataElements.map((e)=>{
          if(e.primaryKey){
            query += `${e.dataName}=${tmpBlockData[i].currentRecord[e.dataName]}&`
          }
          if(!e.primaryKey){
            body[e.dataName]= tmpBlockData[i].currentRecord[e.dataName]
          }
          })
          query += '*'
          query = query.replace('&*','')
          console.log('query - body',query, body)
          transaction = await blockFunctions.peticionPut(blockStruct, appLogin, query, body)
  
          if (transaction.success){
            tmpBlockData[i].initRecord = tmpBlockData[i].currentRecord
            tmpBlockData[i].modAction = 'NONE'
          }
          console.log('transaction',transaction)
          break;
      }
      
    }
    setBlockData(tmpBlockData)
  
  },

  newRecord (blockStruct, currentPosition, blockData, setBlockData) {
    let tmpBlockData = blockData
    let currentRecord = {}

    blockStruct.dataElements.map((e)=>{
      currentRecord[e.dataName] = ''
    })
    let newData = {
      id: currentPosition,
      initRecord: {},
      currentRecord,
      modAction: 'INSERT',
      actionLog: ''
    }
    for (let i=0; i< tmpBlockData.length; i++){
      if(i>= currentPosition){
        tmpBlockData[i].id = tmpBlockData[i].id + 1
      }
    }
    setBlockData([...tmpBlockData.slice(0,currentPosition),newData,...tmpBlockData.slice(currentPosition)])
    console.log('tmpBlockData',tmpBlockData)
  },
};
  
export default blockFunctions;