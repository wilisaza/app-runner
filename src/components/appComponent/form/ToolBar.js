import {
  AppBar,
  Badge,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import MoreIcon from "@mui/icons-material/More";

import AddIcon from "@mui/icons-material/Add";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import RefreshIcon from "@mui/icons-material/Refresh";
import SearchIcon from "@mui/icons-material/Search";
import SearchOffIcon from "@mui/icons-material/SearchOff";

import { useState } from "react";

function ToolBar({ componentTitle, enableButton, renderCondition }) {
  /*console.log(
    "🚀 ~ file: ToolBar.js:25 ~ ToolBar ~ renderCondition:",
    renderCondition
  );*/
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);

  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      //anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={() => enableButton("save")}>
        <IconButton size="small" aria-label="show" color="inherit">
          <SaveIcon />
        </IconButton>
        <Typography variant="body1"> Guardar </Typography>
      </MenuItem>
      <MenuItem onClick={() => enableButton("add")}>
        <IconButton size="small" aria-label="show" color="inherit">
          <AddIcon />
        </IconButton>
        <Typography variant="body1"> Nuevo registro </Typography>
      </MenuItem>
      <MenuItem onClick={() => enableButton("search")}>
        <IconButton size="small" aria-label="show" color="inherit">
          <SearchIcon />
        </IconButton>
        <Typography variant="body1"> Buscar </Typography>
      </MenuItem>
      <MenuItem onClick={() => enableButton("cancelSearch")}>
        <IconButton size="small" aria-label="show" color="inherit">
          <SearchOffIcon />
        </IconButton>
        <Typography variant="body1"> Cancelar búsqueda </Typography>
      </MenuItem>
      <MenuItem onClick={() => enableButton("query")}>
        <IconButton size="small" aria-label="show" color="inherit">
          <RefreshIcon />
        </IconButton>
        <Typography variant="body1"> Cargar </Typography>
      </MenuItem>
      <MenuItem onClick={() => enableButton("delete")}>
        <IconButton size="small" aria-label="show" color="inherit">
          <DeleteIcon />
        </IconButton>
        <Typography variant="body1"> Eliminar </Typography>
      </MenuItem>

      <MenuItem onClick={() => enableButton("prev")}>
        <IconButton size="small" aria-label="show" color="inherit">
          <NavigateBeforeIcon />
        </IconButton>
        <Typography variant="body1"> Anterior </Typography>
      </MenuItem>
      <MenuItem onClick={() => enableButton("next")}>
        <IconButton size="small" aria-label="show" color="inherit">
          <NavigateNextIcon />
        </IconButton>
        <Typography variant="body1"> Siguiente </Typography>
      </MenuItem>

      <MenuItem onClick={() => enableButton("exit")}>
        <IconButton size="small" aria-label="show" color="inherit">
          <ExitToAppIcon />
        </IconButton>
        <Typography variant="body1"> Salir </Typography>
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar variant={"dense"}>
          <Typography
            variant="body1"
            noWrap
            component="div"
            //sx={{ display: { xs: 'none', sm: 'block' } }}
          >
            {componentTitle}
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <Tooltip title="Guardar">
              <IconButton
                size="small"
                aria-label="show"
                color="inherit"
                onClick={() => enableButton("save")}
              >
                <SaveIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Nvo Registro">
              <IconButton
                size="small"
                aria-label="show"
                color="inherit"
                onClick={() => enableButton("add")}
              >
                <AddIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Buscar">
              <IconButton
                size="small"
                aria-label="show"
                color="inherit"
                onClick={() => enableButton("search")}
              >
                <SearchIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Cancelar búsqueda">
              <IconButton
                size="small"
                aria-label="show"
                color="inherit"
                onClick={() => enableButton("cancelSearch")}
              >
                <SearchOffIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Cargar">
              <IconButton
                size="small"
                aria-label="show"
                color="inherit"
                onClick={() => enableButton("query")}
              >
                <RefreshIcon />
              </IconButton>
            </Tooltip>
            {renderCondition !== "DATAGRID" ? (
              <>
                <Tooltip title="Eliminar">
                  <IconButton
                    size="small"
                    aria-label="show"
                    color="inherit"
                    onClick={() => enableButton("delete")}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>

                <Tooltip title="Anterior">
                  <IconButton
                    size="small"
                    aria-label="show"
                    color="inherit"
                    onClick={() => enableButton("prev")}
                  >
                    <NavigateBeforeIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Siguiente">
                  <IconButton
                    size="small"
                    aria-label="show"
                    color="inherit"
                    onClick={() => enableButton("next")}
                  >
                    <NavigateNextIcon />
                  </IconButton>
                </Tooltip>
              </>
            ) : (
              <></>
            )}
            <Tooltip title="Salir">
              <IconButton
                size="small"
                aria-label="show"
                color="inherit"
                onClick={() => enableButton("exit")}
              >
                <ExitToAppIcon />
              </IconButton>
            </Tooltip>
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
    </Box>
  );
}

export default ToolBar;
