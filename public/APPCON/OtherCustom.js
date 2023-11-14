import { styled } from '@mui/material/styles';
import {Box, FormControl, Grid, InputLabel, MenuItem, Paper, Select, TextField } from '@mui/material';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

function CustomForm() {
  return (
    <Box sx={{ flexGrow: 1 }}>
    <Grid container spacing={1} columns={120}>
      <Grid item md={120}>  
        <Grid container spacing={1} columns={120}>
          <Grid item xs={6} md={10}>
            <TextField
                label="Nro. Doc."
                id="nroDoc"
                defaultValue=""
                size="small"
              />
          </Grid>
          <Grid item xs={6} md={25}>
            <TextField
                label="Prefijo"
                id="prefijo"
                defaultValue=""
                size="small"
              />
          </Grid>
          <Grid item xs={6} md={25}>
            <FormControl fullWidth size="small">
            <InputLabel id="estado">Estado</InputLabel>
            <Select
              labelId="estado"
              id="estado"
              label="Estado"
              value={0}
              onChange={(e) => console.log(e.target.value)}
            >
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6} md={20}>
            <TextField
                label="Fecha"
                id="fecha"
                defaultValue=""
                size="small"
              />
          </Grid>
          <Grid item xs={6} md={10}>
            <TextField
                label="Nro. Int."
                id="nroInt"
                defaultValue=""
                size="small"
              />
          </Grid>
        </Grid>
      </Grid>
      <Grid item md={120}>  
        <Grid container spacing={1} columns={120}>
          <Grid item xs={6} md={100}>
            <TextField
                fullWidth
                label="Concepto"
                id="concepto"
                defaultValue=""
                multiline
                rows={4}
                size="small"
              />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  </Box>
  )
}

export default CustomForm