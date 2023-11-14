import { useState, useEffect } from 'react'
import {Alert, Box,Button, Collapse, FormControl, IconButton, InputLabel, Grid, MenuItem, Select, Stack, TextField, Typography, Dialog, DialogTitle, ListItem, ListItemButton, ListItemAvatar, Avatar, List, ListItemText} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import Image from 'next/image'
import styles from '@/styles/Login.module.css'
import logger from "@/util/logger"
import { useStoreActions } from 'easy-peasy'
import { useRouter } from 'next/router'
import { encodeString, iterationNumber } from '@/functions/encodeDecodeFunctions'
import fetchFunctions from '@/functions/fetchFunctions'
import { APPLICATION_API, USERS_API, ORCL_GENERIC_API } from '@/constants'
import { handleChangeObject } from '@/functions/stateFunctions'
import CompanyDialog from './CompanyDialog'
import { data } from 'autoprefixer'
import { Solitreo } from 'next/font/google'
import { decodeInToken } from '@/functions/tokenFunctions'
import { decode } from 'jsonwebtoken'

const libName = '[components/Login.js]'

const appLogin = async (applicationSpecs, dataLogin, setDataLogin, setAlertLogin, setDialogCompany) => {
  //Acá se validan los datos ingresados y se crea la estructura para ejecución de la app
  //Ejemplo token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZENsaWVudCI6IjA5ZmI5NGZhLTM3OTktNGZhZC1hMDljLTA4ZmJmMWI5YzkxMiIsImlkQ29tcGFueUNsaWVudCI6IjJjNWY4MTYxLTYwMmYtNDcyYi1hYjRmLWI2ZTA4NTRmZmUzMCIsImlkVXNlckNsaWVudCI6IjZkN2JlZjg1LTc0YTMtNGQ0MS05YzRkLWFlMWU3YTlhZjllOSIsImlkQXBwbGljYXRpb24iOiI5NzQ0Nzc3OS00ZTFjLTQ1YTEtYWQwYi1mMDkyNWE3MmVjMGMiLCJ0b2tlbiI6ImV5SmhiR2NpT2lKSVV6STFOaUlzSW5SNWNDSTZJa3BYVkNKOS5leUpsYldGcGJDSTZJbmRwYkdsellYcGhRR2R0WVdsc0xtTnZiU0lzSW1sa0lqb2lOVEppTXpBMlltWXRORFl4TlMwME56Tm1MV0V6WWpRdE5URTNZV1l4T0dRNFlXRmpJaXdpWm1seWMzUk9ZVzFsSWpvaVYybHNiR2xoYlNJc0lteGhjM1JPWVcxbElqb2lTWE5oZW1FaUxDSnBZWFFpT2pFMk9ETXdOVGd6TlRnc0ltVjRjQ0k2TVRZNE16TXhOelUxT0gwLnZXQ2JwbkR2Y1ZRTnJ1SjI3Wmcxd2hNcEtNOHJJWk1kdHdQLVg3TTBMR0kiLCJpYXQiOjE2ODMwNTgzNTgsImV4cCI6MTY4MzMxNzU1OH0.F1Espo_m5T_yqees-RiQbsgfRmX5sF5unDNMIoN09Ac
  let loginSucess = true
  let alternateUser = true
  let companyClient = []
  let checkAltUser = {}
  let checkUser = {}
  let token = ''
  let fetchObj ={
    url: APPLICATION_API,
    metodo: 'GET',
    objetoDb: 'client/alternateUser',
    params: dataLogin.userName
  }
  checkAltUser = await fetchFunctions.fetchApi(fetchObj)
  if(!checkAltUser.success){
    loginSucess = false
    setAlertLogin({
      open:true,
      message: 'No connection on alternate user'
    })
  }
  //Token de uso temporal mientras se define generación de Token para AlternateUser
  token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IndpbGlzYXphQGdtYWlsLmNvbSIsImlkIjoiNTJiMzA2YmYtNDYxNS00NzNmLWEzYjQtNTE3YWYxOGQ4YWFjIiwiZmlyc3ROYW1lIjoiV2lsbGlhbSIsImxhc3ROYW1lIjoiSXphc2EiLCJpYXQiOjE2OTE1MTAzMDUsImV4cCI6MTcwMDE1MDMwNX0.xHRPOZ5OiOZNjf3bibNCEP78JOU-nnix14drWUZTWOQ'
  
  if(!checkAltUser.data?.length && loginSucess){ //No encuentra usuario alterno, se procede con el usuario de la plataforma
    loginSucess = true
    alternateUser = false
    fetchObj ={
      url: USERS_API,
      metodo: 'POST',
      objetoDb: 'auth/login',
      body: {
        email: dataLogin.userName,
        password: dataLogin.password
      }
    }
    
    checkUser = await fetchFunctions.fetchApi(fetchObj)
    
    if(!checkUser.success){ // error en login de plataforma
      loginSucess = false
      setAlertLogin({
        open:true,
        message: checkUser.error?? 'Login error'
      })
    }
    if(loginSucess && checkUser?.token){  
      token = checkUser.token    
      let decodeToken = decodeInToken(token)
      if(decodeToken.success && decodeToken.data?.id){ //Existe id de usuario y se consultan sus registros de UserClient
        fetchObj ={
          url: APPLICATION_API,
          metodo: 'GET',
          objetoDb: 'application/user',
          params: decodeToken.data.id,
          token
        }
        console.log('checkUser1',checkUser)
        checkUser = await fetchFunctions.fetchApi(fetchObj)
      }
      console.log('checkUser2',checkUser)
      if(!checkUser.success){ // error en consulta de userClient
        loginSucess = false
        setAlertLogin({
          open:true,
          message: checkUser.error?? 'UserClient error'
        })
      }

      if(checkUser?.data?.length == 0){ //No se encontraron registros de UserClient
        loginSucess = false
        setAlertLogin({
          open:true,
          message: 'No userClient found'
        })
      }

      if(loginSucess && checkUser?.data?.length){ //Se encontraron registros de UserClient
        let i, j
        const userClient = checkUser.data
        const { PlatClient } = applicationSpecs //se usa nombre con inicial en mayúscula por ser variable de relación en prisma
        for (i in userClient ){
          for (j in PlatClient){
            if(userClient[i].idCompany === PlatClient[j].idCompany && applicationSpecs.id === userClient[i].PlatApplication.id){
              companyClient.push({
                idUser: decodeToken.data.id,
                idClient: PlatClient[j].id,
                idCompany: userClient[i].idCompany,
                description: userClient[i].description,
                clientSpecs: PlatClient[j].clientSpecs?? {},
                token
              })
            }
          }
        }
      }
      
    }
  }

  if(alternateUser && loginSucess){
    console.log('CheckAltUser',checkAltUser)
    
    let i, j
    const userClient = checkAltUser.data
    const { PlatClient } = applicationSpecs //se usa nombre con inicial en mayúscula por ser variable de relación en prisma
    console.log('applicationSpecs',applicationSpecs)
    for (i in userClient ){
      for (j in PlatClient){
        if(userClient[i].PlatClient.idCompany === PlatClient[j].idCompany){
          companyClient.push({
            idUser: userClient[i].idUser,
            idClient: userClient[i].idClient,
            idCompany: userClient[i].PlatClient.idCompany,
            description: userClient[i].PlatClient.description,
            clientSpecs: userClient[i].PlatClient.clientSpecs?? {},
            token
          })
        }
      }
    }
    
  }

  handleChangeObject(setDataLogin,'alternateUser',alternateUser)
  handleChangeObject(setDataLogin,'token', token)

  if(companyClient.length > 1){
    setDialogCompany({
      open: true,
      companyClient 
    })
  }

  if(companyClient.length == 1){
    handleChangeObject(setDataLogin,'idUser',companyClient[0].idUser)
    handleChangeObject(setDataLogin,'idClient',companyClient[0].idClient)
    handleChangeObject(setDataLogin,'clientSpecs',companyClient[0].clientSpecs)
    handleChangeObject(setDataLogin,'loginPrev',true)
    
  }

  console.log('companyClient',companyClient)
}

function Login({applicationSpecs}) {
  //console.log('applicationSpecs',applicationSpecs)
  const [dialogCompany, setDialogCompany] = useState({
    open: false,
    companyClient:[]
  })
  const [alertLogin, setAlertLogin] = useState({
    open: false,
    message: ''
  })
  const [dataLogin, setDataLogin] = useState({
    idApplication: applicationSpecs.id,
    idClient:'',
    userName: '',
    password: '',
    alternateUser: false,
    loginPrev: false,
    token: '',
  })

  const router = useRouter()

  const { setAppLoginData } = useStoreActions((actions) => actions.appLogin);

  useEffect(() => {
    (async function checkDbLogin () {
    if(dataLogin.loginPrev){
      console.log('Entra a useEffect')
      let dbLoginSuccess =  true
      let usr = ''
      let pwd = ''
      let iterations = 0
      if(dataLogin.alternateUser){
        
        let loginError = false
        let fetchObj ={}
        iterations = iterationNumber()
        usr = encodeString(iterations,dataLogin.userName)
        pwd = encodeString(iterations,dataLogin.password)
        
        //conexión con el servicio de acceso a BD
        let {connection, userValidation} = dataLogin.clientSpecs

        switch (connection.connectionProvider){
          case 'ORCL_SYNCHROX':
            fetchObj ={
              url: ORCL_GENERIC_API,
              metodo: 'POST',
              objetoDb: 'custom/dual',
              body: {sysdate:''},
              header: {
                dbuser: usr,
                dbpassword: pwd,
                dbhost: connection.dbHost,
                dbsid: connection.dbName,
                dbport: connection.dbPort,
                iterations
              }
            }
            break
        }
        const checkLogin = await fetchFunctions.fetchApi(fetchObj)
        console.log('checkLogin',checkLogin)
        if(!checkLogin.success){
          dbLoginSuccess = false
          setAlertLogin({
            open:true,
            message: checkLogin.error.message?? checkLogin.error
          })
        }

      }
      
      
      if (dbLoginSuccess){
        //Acá iría solicitud de token
        let appLoginData = {
          altUser: dataLogin.alternateUser? usr : '',
          altPassword: dataLogin.alternateUser? pwd : '',
          iterations: dataLogin.alternateUser? iterations : 0,
          idUser: dataLogin.idUser,
          idApplication: dataLogin.idApplication,
          idClient: dataLogin.idClient,
          clientSpecs: dataLogin.clientSpecs,
          token: dataLogin.token
          
        }
        console.log('appLoginData',appLoginData)
        setAppLoginData(appLoginData)
        router.push('/appPage')
      }
    }
  })()
  }, [dataLogin])
  

  const handleChange = (event)=>{
    const functionName = `${libName} [handleChange]`
    setDataLogin((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }))
    handleChangeObject(setDataLogin,'loginPrev',false) // para prevenir evaluación continua de login
    handleChangeObject(setAlertLogin,'open',false)
    //logger.info(`${functionName} ${event.target.name}=${event.target.value}`)
  }

  const handleDialogClickOpen = () => {
    handleChangeObject(setDialogCompany,'open',true)
  };

  const handleDialogClose = (value) => {
    handleChangeObject(setDialogCompany,'open',false)
    handleChangeObject(setDataLogin,'idUser',value.idUser)
    handleChangeObject(setDataLogin,'idClient',value.idClient)
    handleChangeObject(setDataLogin,'clientSpecs',value.clientSpecs)
    handleChangeObject(setDataLogin,'loginPrev',true)
    handleChangeObject(setDataLogin,'token',value.token)
  };

  return (
    <Box sx={{display:'flex',
        flexDirection:'column',
        justifyContent:'center',
        width:'98%',
        height:'600px',
        marginTop:'5px',
        }}
          
        >
        <Grid container spacing={1}>
          <Grid item xs={12} sm={6} md={7} sx={{
              display:'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              <Image
                className={styles.siifLogo}
                //src='/logo-siifweb2.png'
                src={applicationSpecs.urlLogo}
                alt='Logo SiifWeB'
                width='250'
                height='100'
            />

          </Grid>
          <Grid item xs={12} sm={6} md={5} sx={{
            display:'flex',
            justifyContent: 'center',
          }}
          > 
            <Box
              sx={{
                display:'flex',
                justifyContent: 'center',
                padding:'15px',
                minWidth:'280px',
                width:'100%',
                maxWidth:'400px',
                minHeight:'400px',
              }}
            >
              <Grid container sx={{
                  justifyContent:'center',
                  alignContent:'space-around',
                  width:'100%',
                  padding:'30px 10px 30px 10px',
                  borderRadius: '5px',
                  border: '1px solid #7F7F7F',
                }}
              >
                <Grid item>
                  <Typography
                    variant='h2'
                    textAlign='center'
                    fontSize='32px'
                  >
                    Iniciar Sesión
                  </Typography>
                  <Typography
                    variant='h4'
                    textAlign='center'
                    fontSize='22px'
                  >
                    {applicationSpecs.fullName}
                  </Typography>
                </Grid>
                <Box sx={{ display:'flex', flexDirection:'column',  justifyContent: 'center',
              alignItems: 'center', minWidth: 250 }}>
                <Stack spacing={2}>
                  <TextField name="userName" id='userName' label = 'Usuario' variant='outlined' value={dataLogin.userName} onChange={handleChange} />

                  <TextField name='password' id='password' label = 'Contraseña' variant='outlined' type='password' value={dataLogin.password} onChange={handleChange} />
                  
                  <Button
                    onClick={() => appLogin(applicationSpecs, dataLogin, setDataLogin, setAlertLogin, setDialogCompany)}
                    //size='large'
                    variant='contained'
                    sx={{
                      width: '100%',
                      height: '35px',
                      fontSize: '16px',
                      borderRadius: '10px',
                    }}
                  >
                    Iniciar Sesión
                  </Button>
                  <Box sx={{ width: '100%' }}>
                    <Collapse in={alertLogin.open}>
                      <Alert
                        severity='error'
                        action={
                          <IconButton
                            aria-label="close"
                            color="inherit"
                            size="small"
                            onClick={() => {
                              handleChangeObject(setAlertLogin,'open',false)
                            }}
                          >
                            <CloseIcon fontSize="inherit" />
                          </IconButton>
                        }
                        sx={{ mb: 2 }}
                      >
                        {alertLogin.message}
                      </Alert>
                    </Collapse>
                  </Box>
                  </Stack>
                </Box>
                </Grid>
            </Box>
            </Grid>
        </Grid>
        <Grid container spacing={1} sx={{
              display:'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
          <Grid item>
          <Box>
            <Typography
              textAlign='center'
              variant='caption'
            >
              © Synchrox 2023
            </Typography>
          </Box>
          </Grid>
        </Grid>
        <CompanyDialog 
          dataDialog = {dialogCompany.companyClient}
          selectedValue={dataLogin.idClient}
          open={dialogCompany.open}
          onClose={ handleDialogClose }
        />
    </Box>
  )
}

export default Login