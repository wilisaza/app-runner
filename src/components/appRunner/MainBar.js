import { AppBar, IconButton, Toolbar, Typography } from "@mui/material"
import MenuIcon from '@mui/icons-material/Menu';

function MainBar({showMenu, appStruct, handleShowMenu}) {
  return (
    <AppBar position="fixed" open={showMenu}>
      <Toolbar>
          {appStruct.applicationSpecs.launch == 'MENU' ? 
          <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2, ...(showMenu && { display: 'none' }) }}
          onClick={() => handleShowMenu() }
      >
          <MenuIcon />
      </IconButton> :
      <></>
      }
      <Typography variant="body1" component="div" noWrap>
      {appStruct.fullName} - {appStruct.shortName}
      </Typography>
    </Toolbar>
  </AppBar>
  )
}

export default MainBar