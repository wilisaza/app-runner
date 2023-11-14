import TitleBack from "@/components/contructor/common/TitleBack";
import {
  GridOn,
  HomeOutlined,
  ListAltOutlined,
  SmartDisplayOutlined,
  ViewComfyOutlined,
} from "@mui/icons-material";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";
import React from "react";
import { v4 as uuidv4 } from "uuid";

const Constructor = () => {
  const router = useRouter();
  const options = [
    {
      name: "Previsualización",
      id: uuidv4(),
      icon: <SmartDisplayOutlined sx={{ fontSize: 70 }} />,
      onClick: () => {
        router.push("/constructor/preview");
      },
    },
    {
      name: "Estructura menú aplicaciones",
      id: uuidv4(),
      icon: <ListAltOutlined sx={{ fontSize: 70 }} />,
      onClick: () => {
        router.push("/constructor/menustructure");
      },
    },
    {
      name: "Crear Componente",
      id: uuidv4(),
      icon: <ViewComfyOutlined sx={{ fontSize: 70 }} />,
      onClick: () => {
        router.push("/constructor/appcomponent");
      },
    },
  ];

  const editionExamples = [
    {
      name: "Main Page",
      id: uuidv4(),
      icon: (
        <HomeOutlined
          sx={{
            fontSize: 50,
            color: "#757575",
          }}
        />
      ),
    },
    {
      name: "Comprobante CNT",
      id: uuidv4(),
      icon: <ViewComfyOutlined sx={{ fontSize: 50, color: "#757575" }} />,
    },
    {
      name: "Comprobante ALM",
      id: uuidv4(),
      icon: <ViewComfyOutlined sx={{ fontSize: 50, color: "#757575" }} />,
    },
    {
      name: "Bancos",
      id: uuidv4(),
      icon: <GridOn sx={{ fontSize: 60, color: "#757575" }} />,
    },
  ];
  return (
    <Box width="100%" display="flex" flexDirection="column" rowGap={2}>
      <TitleBack Title="Constructor" redirect="appPage" />
      <Box backgroundColor="#E7E7E7" width="100%" pl={2}>
        <Typography variant="h5" color="black">
          Acciones de edición
        </Typography>
      </Box>
      <Grid container spacing={2} justifyContent="center">
        {options.map((option) => (
          <Grid
            key={option.id}
            item
            xs={12}
            sm={6}
            md={4}
            lg={3}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <Card sx={{ maxWidth: 345, minWidth: 250 }}>
              <CardActionArea onClick={option.onClick}>
                <CardContent
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    minHeight: "150px",
                  }}
                >
                  {option.icon}
                  <Typography
                    gutterBottom
                    variant="h6"
                    component="div"
                    textAlign="center"
                  >
                    {option.name}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Box backgroundColor="#E7E7E7" width="100%" pl={2}>
        <Typography variant="h5" color="black">
          Edición de aplicaciones
        </Typography>
      </Box>

      <Grid container px="20px" spacing={2}>
        <Grid item xs={12} display="flex" justifyContent="center">
          <TextField
            label="Buscar"
            size="small"
            fullWidth
            InputLabelProps={{ shrink: true }}
            sx={{ maxWidth: "500px" }}
          />
        </Grid>
        {editionExamples.map((option) => (
          <Grid key={option.id} item xs={5} sm={4} md={2}>
            <Card
              sx={{
                maxWidth: 200,
                minWidth: 100,
                height: "100%",
                backgroundColor: "transparent",
                boxShadow: "none",
              }}
            >
              <CardActionArea sx={{ height: "100%" }}>
                <CardContent
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  {option.icon}
                  <Typography
                    gutterBottom
                    variant="h6"
                    component="div"
                    textAlign="center"
                  >
                    {option.name}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Constructor;
