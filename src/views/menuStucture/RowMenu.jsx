"use client";
import { AddCircle, Cancel, Delete, Edit, Save } from "@mui/icons-material";
import { Box, IconButton, Menu, MenuItem } from "@mui/material";
import { GridRowModes } from "@mui/x-data-grid";
import React from "react";

const RowMenu = ({
  id,
  row,
  rowModesModel,
  handleEditClick,
  handleDeleteClick,
  handleSaveClick,
  handleCancelClick,
  handleAddChild,
}) => {
  const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

  //Menu funtions
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    console.log("🚀 ~ file: hooks.js:20 ~ handleClick ~ event:", event);
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  //

  return (
    <Box width="100%" display="flex" justifyContent="end">
      {isInEditMode && (
        <Box>
          <IconButton
            size="small"
            onClick={handleSaveClick(id)}
            sx={{
              "&:hover": {
                color: "#1A72E6",
              },
            }}
          >
            <Save />
          </IconButton>
          <IconButton size="small" onClick={handleCancelClick(id)}>
            <Cancel
              sx={{
                "&:hover": {
                  color: "red",
                },
              }}
            />
          </IconButton>
        </Box>
      )}

      {!isInEditMode && (
        <Box>
          {row.isMenu && (
            <IconButton
              size="small"
              onClick={handleClick}
              sx={{
                "&:hover": {
                  color: "#1A72E6",
                },
              }}
            >
              <AddCircle />
            </IconButton>
          )}
          <IconButton
            size="small"
            onClick={handleEditClick(id)}
            sx={{
              "&:hover": {
                color: "#1A72E6",
              },
            }}
          >
            <Edit />
          </IconButton>
          <IconButton
            size="small"
            onClick={handleDeleteClick(row.name, id)}
            sx={{
              "&:hover": {
                color: "red",
              },
            }}
          >
            <Delete />
          </IconButton>
        </Box>
      )}
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={handleAddChild(row.hierarchy, true, row.id)}>
          Menu
        </MenuItem>
        <MenuItem onClick={handleAddChild(row.hierarchy, false, row.id)}>
          Item
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default RowMenu;
