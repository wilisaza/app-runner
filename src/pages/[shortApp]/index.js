import Login from "@/components/login/Login"
import TestMui from "@/components/TestMui"
import { APPLICATION_API } from "@/constants"
import fetchFunctions from "@/functions/fetchFunctions"
import logger from "@/util/logger"

const libName = '[[shortApp]/index.js]'

function Index({initType, status, applicationSpecs}) {
  if (initType == 'login'){
    if(status !== 'OK')
      return(
        <>
          {/*<h3>{applicationSpecs.shortName}</h3>*/}
          <TestMui  testTitle={applicationSpecs.shortName}/>
        </>
      )
    return (
      <>
        <Login applicationSpecs={applicationSpecs} />
      </>
    )
  }
    
  return(
    <h3>Need to decode token</h3>
  )
}
export default Index


export async function getServerSideProps(context) {
  const functionName = `${libName} [getServerSideProps]`
  const { shortApp } = context.params
  let applicationSpecs = {} 
  let initType =''

  if (shortApp?.length < 45){
    initType='login'
    logger.info(`${functionName} initType=${initType}`)
    try {
      let fetchObj ={
        url: APPLICATION_API,
        metodo: 'GET',
        objetoDb: 'application/shortName',
        params: shortApp
      }
      const ret = await fetchFunctions.fetchApi(fetchObj)  
      if(!ret.success){
        logger.error(`${functionName} error=${ret.error}`)  
        return { props: { initType, status:'ERROR', applicationSpecs: {shortName: `Can not access app service - ${ret.error}`} } }
      }
      if (ret.data.length){
        logger.info(`${functionName} App found`)
        applicationSpecs = ret.data[0]  
        return { props: { initType, status:'OK', applicationSpecs } }
      }
      logger.warn(`${functionName} App not found`)
        applicationSpecs = {shortName: 'Company short name not found'}  
        return { props: { initType, status:'NOT_FOUND', applicationSpecs } }
        

    } catch (error) {
      logger.error(`${functionName} error=${error}`)  
      return { props: { initType, status:'ERROR', applicationSpecs: {shortName: 'Can not access data source'} } }
    }
  }
  //lógica de procesamiento con token
  initType='token'
  logger.info(`${functionName} initType=${initType}`)
  applicationSpecs = {shortName: shortApp}
  return { props: { initType, status: 'OK', applicationSpecs } }
}