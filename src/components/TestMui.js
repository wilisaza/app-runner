import { useState } from 'react'
import {Box,Button, Container, FormControl, InputLabel, Grid, MenuItem, Select, TextField, Typography} from '@mui/material'
import Image from 'next/image'
import styles from '@/styles/Login.module.css'
import DataBlock from './appComponent/form/DataBlock';
import ToolBar from './appComponent/form/ToolBar';

function TestMui({testTitle}) {

  const [formData, setFormData] = useState({
    name: '',
    name2: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform form submission or validation here
    console.log(formData);
    // Reset the form after submission
    setFormData({
      name: '',
      name2: '',
      email: '',
      message: '',
    });
  };

  return (
    <>
    <ToolBar componentTitle={testTitle} />
    </>
  );

  /*const [age, setAge] = useState('')
  const handleChange = (event)=>{
    setAge(event.target.value)
  }
  return (
    <Box sx={{display:'flex',
        flexDirection:'column',
        justifyContent:'center',
        width:'98%',
        height:'600px',
        marginTop:'5px',
        //backgroundColor: 'cyan'
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
                src='/logo-siifweb.png'
                alt='Logo SiifWeB'
                width='250'
                height='100'
            />

          </Grid>
          <Grid item xs={12} sm={6} md={5} sx={{
            display:'flex',
            justifyContent: 'center',
            //justifyContent: { sm:'center', md:'left' }
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
                //backgroundColor:'orange'
              }}
            >
              <Grid container sx={{
                  justifyContent:'center',
                  alignContent:'space-around',
                  width:'100%',
                  padding:'30px 10px 30px 10px',
                  borderRadius: '5px',
                  border: '1px solid #7F7F7F',
                  //backgroundColor: 'cyan',
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
                    XXXXXXXXXXXXXXXXXXX
                  </Typography>
                </Grid>
                <TextField id='userName' label = 'Usuario' variant='outlined' />
                <TextField id='pasword' label = 'Contraseña' variant='outlined' type='password' />
                <Box sx={{ minWidth: 250 }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Compañía</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={age}
                    label="Age"
                    onChange={handleChange}
                  >
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                  </Select>
                </FormControl>
                </Box>
                <Grid item xs={8} sm={8} md={6}>
                  <Button
                    onClick={() => login()}
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
                </Grid>
                </Grid>
            </Box>
            </Grid>
        </Grid>
        <Grid container spacing={1} sx={{
              display:'flex',
              justifyContent: 'center',
              alignItems: 'center',
              //backgroundColor: 'orange'
            }}>
          <Grid item>
          <Box>
            <Typography
              textAlign='center'
              variant='caption'
              //fontSize='16px'
            >
              © Synchrox 2023
            </Typography>
          </Box>
          </Grid>
        </Grid>
    </Box>
  )*/

}

export default TestMui