import {
  AppBar,
  Badge,
  Box,
  IconButton,
  ListItemButton,
  ListItemIcon,
  ListItemText,
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

import { useState } from "react";

function ToolBar({ width, componentTitle, enableButton }) {
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);

  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const optionsToolbar = [
    {
      title: "Guardar",
      Icon: <SaveIcon />,
      onClick: () => enableButton("save"),
    },
    {
      title: "Nvo Registro",
      Icon: <AddIcon />,
      onClick: () => enableButton("add"),
    },
    {
      title: "Cargar",
      Icon: <RefreshIcon />,
      onClick: () => enableButton("query"),
    },
    {
      title: "Eliminar",
      Icon: <DeleteIcon />,
      onClick: () => enableButton("delete"),
    },
    {
      title: "Anterior",
      Icon: <NavigateBeforeIcon />,
      onClick: () => enableButton("prev"),
    },
    {
      title: "Siguiente",
      Icon: <NavigateNextIcon />,
      onClick: () => enableButton("next"),
    },
    {
      title: "Salir",
      Icon: <ExitToAppIcon />,
      onClick: () => enableButton("exit"),
    },
  ];

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "bottom",
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
      {optionsToolbar.map((option, index) => {
        return (
          <MenuItem key={index} onClick={option.onClick}>
            <ListItemIcon>{option.Icon}</ListItemIcon>
            <ListItemText>{option.title}</ListItemText>
          </MenuItem>
        );
      })}
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1, width: width }}>
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
            {optionsToolbar.map((option, index) => {
              return (
                <Tooltip key={index} title={option.title}>
                  <IconButton
                    size="small"
                    aria-label="show"
                    color="inherit"
                    onClick={option.onClick}
                  >
                    {option.Icon}
                  </IconButton>
                </Tooltip>
              );
            })}
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
