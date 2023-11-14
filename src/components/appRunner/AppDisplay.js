import { APPLICATION_API } from "@/constants";
import { decodeString } from "@/functions/encodeDecodeFunctions";
import fetchFunctions from "@/functions/fetchFunctions";
import { styled, useTheme } from "@mui/material/styles";
import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import { useStoreState } from "easy-peasy";
import { useState, useEffect } from "react";
import MenuTree from "./MenuTree";
import MainBar from "./MainBar";
import MainContent from "./MainContent";
import { validateLaunchToken } from "@/functions/jwtFunctions";
import SideBar from "./SideBar";
import { EditNote } from "@mui/icons-material";
import { Router, useRouter } from "next/router";

const drawerWidth = 280;

// const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
//   ({ theme, open }) => ({
//     flexGrow: 1,
//     padding: theme.spacing(3),
//     transition: theme.transitions.create("margin", {
//       easing: theme.transitions.easing.simport BottomNavigationAction from '@mui/material/BottomNavigationAction';harp,
//       duration: theme.transitions.duration.leavingScreen,
//     }),
//     marginLeft: `-${drawerWidth}px`,
//     ...(open && {
//       transition: theme.transitions.create("margin", {
//         easing: theme.transitions.easing.easeOut,
//         duration: theme.transitions.duration.enteringScreen,
//       }),
//       marginLeft: 0,
//     }),
//   })
// );

// const AppBar = styled(MuiAppBar, {
//   shouldForwardProp: (prop) => prop !== 'open',
// })(({ theme, open }) => ({
//   transition: theme.transitions.create(['margin', 'width'], {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.leavingScreen,
//   }),
//   ...(open && {
//     width: `calc(100% - ${drawerWidth}px)`,
//     marginLeft: `${drawerWidth}px`,
//     transition: theme.transitions.create(['margin', 'width'], {
//       easing: theme.transitions.easing.easeOut,
//       duration: theme.transitions.duration.enteringScreen,
//     }),
//   }),
// }));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

function AppDisplay() {
  const theme = useTheme();
  const router = useRouter();
  const appLogin = useStoreState((state) => state.appLogin.appLoginData);
  //console.log('AppLogin - AppDisplay',appLogin)
  const [appStruct, setAppStruct] = useState({
    applicationSpecs: {
      launch: "",
    },
  });

  const [showMenu, setShowMenu] = useState(false);
  const [stateButton, setStateButton] = useState(true);
  const [currentComponent, setCurrentComponent] = useState("");
  const [openTabs, setOpenTabs] = useState([]);

  const getAppStruct = async () => {
    console.log("Entra a getAppStruct");
    let fetchObj = {
      url: APPLICATION_API,
      metodo: "GET",
      objetoDb: `application/runnerStruct/${appLogin?.idApplication}`,
      token: appLogin.token,
    };
    console.log("appLogin", appLogin);
    const fetchAppStruct = await fetchFunctions.fetchApi(fetchObj);
    // Acá debe ir validación para el parámetro / vencimiento del token
    if (fetchAppStruct.success) {
      setAppStruct(fetchAppStruct.data);
    }

    console.log("fetchAppStruct", fetchAppStruct);
  };

  const getComponentStruct = async () => {
    let fetchObj = {
      url: APPLICATION_API,
      metodo: "GET",
      objetoDb: `component/${currentComponent}`,
      token: appLogin.token,
    };
    const fetchComponentStruct = await fetchFunctions.fetchApi(fetchObj);
    console.log("FetchComponentStruct", fetchComponentStruct);
    if (fetchComponentStruct.success) {
      //setOpenTabs(openTabs.push(fetchComponentStruct.data[0]))
      //setOpenTabs([...openTabs, ...fetchComponentStruct.data])
      setOpenTabs(openTabs.concat(fetchComponentStruct.data));
      console.log("OpenTabs IF", openTabs);
    }
  };

  const handleShowMenu = () => {
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    getAppStruct();
  }, []);

  useEffect(() => {
    if (currentComponent !== "") getComponentStruct();
  }, [currentComponent]);

  console.log("Currentcomponent", currentComponent);

  return (
    <>
      <Box display="flex" alignContent="center">
        {/*<MainBar showMenu={showMenu} appStruct={appStruct} handleShowMenu={handleShowMenu} />*/}
        <AppBar open={showMenu}>
          <Toolbar>
            <Box display="flex" alignItems="center" columnGap="15px">
              <Typography variant="body1">
                {appStruct.fullName} - {appStruct.shortName}
              </Typography>
              <BottomNavigation showLabels sx={{ borderRadius: "10px" }}>
                <BottomNavigationAction
                  onClick={() => {
                    router.push("/constructor");
                  }}
                  icon={<EditNote />}
                  label="Constructor"
                  sx={{ borderRadius: "10px" }}
                />
              </BottomNavigation>
            </Box>
          </Toolbar>
        </AppBar>

        <Box
          component="main"
          width=" 100%"
          height="calc(100vh - 70px)"
          mt="64px"
          overflow="auto"
        >
          <SideBar
            stateButton={stateButton}
            stateSideBar={showMenu}
            setStateButton={setStateButton}
            setStateSideBar={setShowMenu}
          >
            <MenuTree
              menuStruct={appStruct.menu}
              setCurrentComponent={setCurrentComponent}
            />
          </SideBar>
          <Box
            component="section"
            padding="10px 20px"
            p={2}
            sx={{
              marginLeft: stateButton
                ? { md: showMenu ? "300px" : "30px" }
                : { md: "40px" },
            }}
          >
            <MainContent openTabs={openTabs} setOpenTabs={setOpenTabs} />
          </Box>
        </Box>
      </Box>
    </>
  );
}
export default AppDisplay;
