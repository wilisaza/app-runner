import { store } from "@/store";
import { CssBaseline, createTheme, ThemeProvider } from "@mui/material";
import {
  useColorScheme as useMaterialColorScheme,
  Experimental_CssVarsProvider as MaterialCssVarsProvider,
  experimental_extendTheme as extendMaterialTheme,
  THEME_ID,
} from "@mui/material/styles";
import "@/styles/globals.css";
import {
  CssVarsProvider as JoyCssVarsProvider,
  useColorScheme as useJoyColorScheme,
} from "@mui/joy/styles";

import { StoreProvider } from "easy-peasy";
import Head from "next/head";
import { LicenseInfo } from "@mui/x-data-grid-premium";
import NavBar from "@/components/navbar/NavBar";

const materialTheme = extendMaterialTheme();

const theme = createTheme({
  palette: {
    /* primary: {
      main: '#FCB52C'
    }*/
  },
});

LicenseInfo.setLicenseKey(
  `ded39ce0424b7c53a4023623f869b768Tz01NTc1OCxFPTE3MDIwNTUxMTE3ODMsUz1wcmVtaXVtLExNPXN1YnNjcmlwdGlvbixLVj0y`
);

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>App Runner 2</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <MaterialCssVarsProvider theme={{ [THEME_ID]: materialTheme }}>
        <JoyCssVarsProvider>
          <CssBaseline />
          {/*<ThemeProvider theme={theme}>*/}
          <StoreProvider store={store}>
            <NavBar />
            <Component {...pageProps} />
          </StoreProvider>
          {/*</ThemeProvider>*/}
        </JoyCssVarsProvider>
      </MaterialCssVarsProvider>
    </>
  );
}
