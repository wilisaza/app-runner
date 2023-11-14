import { Avatar, Dialog, DialogTitle, List, ListItem, ListItemAvatar, ListItemButton, ListItemText } from "@mui/material";
import BusinessIcon from '@mui/icons-material/Business';

function CompanyDialog( { dataDialog, onClose, selectedValue, open }) {

    const handleClose = () => {
      onClose(selectedValue);
    };
  
    const handleListItemClick = (value) => {
      onClose(value);
    };
    return (

      <Dialog onClose={handleClose} open={open}>
        <DialogTitle>Seleccionar compañía</DialogTitle>
        <List sx={{ pt: 0 }}>
          {dataDialog.map((dD, index) => (
            <ListItem key={index} disableGutters>
              <ListItemButton onClick={() => handleListItemClick(dD)} key={dD.idClient}>
                <ListItemAvatar>
                  <Avatar sx={{}}>
                    <BusinessIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={dD.description} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Dialog>
    );
  }

export default CompanyDialog