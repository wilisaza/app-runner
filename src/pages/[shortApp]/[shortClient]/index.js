import { APPLICATION_API } from "@/constants"
import fetchFunctions from "@/functions/fetchFunctions"
import logger from "@/util/logger"

const libName = '[[shortApp]/[shortClient]/index.js]'


function index({ status, applicationSpecs}) {
  return (
    <div>index shortClient - {status}</div>
  )
}

export default index

export async function getServerSideProps(context) {
    const functionName = `${libName} [getServerSideProps]`
    const { shortApp, shortClient } = context.params
    let applicationSpecs = {} 
    
    try {
      let fetchObj ={
        url: APPLICATION_API,
        metodo: 'GET',
        objetoDb: 'application/shortName',
        params: `${shortApp}/${shortClient}`
      }
      const ret = await fetchFunctions.fetchApi(fetchObj)  
      if(!ret.success){
        logger.error(`${functionName} error=${ret.error}`)  
        return { props: { status:'ERROR', applicationSpecs: {shortName: `Can not access app service - ${ret.error}`} } }
      }
      if (ret.data.length){
        logger.info(`${functionName} App found`)
        applicationSpecs = ret.data[0]  
        return { props: { status:'OK', applicationSpecs } }
      }
    } 
    catch (error) {
      logger.error(`${functionName} error=${error}`)  
       return { props: { status:'ERROR', applicationSpecs: {shortName: 'Can not access data source'} } }
    }

  }