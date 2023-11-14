import {
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import FolderOutlinedIcon from "@mui/icons-material/Folder";
import FeaturedPlayListIcon from "@mui/icons-material/FeaturedPlayList";
import TreeView from "@mui/lab/TreeView";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import TreeItem from "@mui/lab/TreeItem";
import { Description, ExpandLess } from "@mui/icons-material";
import { grey } from "@mui/material/colors";
const greyCustom = grey[800];

const TreeMenu = (menu, setCurrentComponent) => {
  return menu.map((m) => {
    if (m.subMenu.length)
      return (
        <TreeItem
          key={m.id}
          nodeId={m.id}
          label={`${m.optionName}`}
          sx={{ marginTop: "5px" }}
        >
          {TreeMenu(m.subMenu, setCurrentComponent)}
        </TreeItem>
      );
    else
      return (
        <TreeItem
          key={m.id}
          nodeId={m.id}
          label={`- ${m.optionName}`}
          onClick={() => setCurrentComponent(m.execCall)}
          sx={{ marginTop: "5px" }}
        />
      );
  });
};

function MenuTree({ menuStruct, setCurrentComponent }) {
  console.log("menuStruct", menuStruct);
  return (
    <>
      <TreeView
        aria-label="file system navigator"
        defaultCollapseIcon={<ExpandLess sx={{ color: greyCustom }} />}
        defaultExpandIcon={<FolderOutlinedIcon sx={{ color: greyCustom }} />}
        defaultEndIcon={<Description sx={{ color: greyCustom }} />}
        sx={{
          height: 240,
          flexGrow: 1,
          maxWidth: 400,
          overflowY: "auto",
        }}
      >
        {menuStruct && menuStruct.length ? (
          TreeMenu(menuStruct, setCurrentComponent)
        ) : (
          <></>
        )}
      </TreeView>
    </>
  );
}

export default MenuTree;
