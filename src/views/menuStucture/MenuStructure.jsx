"use client";
import React from "react";
import { DataGridPremium } from "@mui/x-data-grid-premium";
import { Box, Button, Menu, MenuItem } from "@mui/material";
import useMenuStructure from "./hooks";
// import { localeTextsEsp } from "@/utils/language/dataGrid";
import { AddCircle, Save } from "@mui/icons-material";
import TitleBack from "@/components/contructor/common/TitleBack";
import CustomToolbar from "@/components/dataGrid/CustomToolBar";

const getTreeDataPath = (row) => row.hierarchy;

const MenuStructure = () => {
  const { stateFuntions, stateVariables } = useMenuStructure();
  const { rows, columns, rowModesModel, apiRef } = stateVariables;
  const {
    handleAddClick,
    getRowClassName,
    processRowUpdate,
    processRowUpdateError,
    handleUpdateRows,
  } = stateFuntions;

  //Menu funtions
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  //

  const addOption = (
    <>
      <Button size="small" startIcon={<Save />} onClick={handleUpdateRows}>
        Guardar cambios
      </Button>
      <Button size="small" startIcon={<AddCircle />} onClick={handleClick}>
        Agregar
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={() => handleAddClick(true)}>Menu</MenuItem>
        <MenuItem onClick={() => handleAddClick(false)}>Item</MenuItem>
      </Menu>
    </>
  );
  return (
    <Box sx={{ width: "100%" }}>
      <TitleBack Title="Estructura Menú Aplicaciones" redirect="constructor" />
      <Box sx={{ height: "calc(100% - 80px)", px: "30px" }}>
        <DataGridPremium
          apiRef={apiRef}
          treeData
          rows={rows}
          rowModesModel={rowModesModel}
          columns={columns}
          editMode="row"
          getRowClassName={getRowClassName}
          getTreeDataPath={getTreeDataPath}
          // localeText={localeTextsEsp}
          density="compact"
          groupingColDef={{
            cellClassName: "group-cell",
          }}
          processRowUpdate={processRowUpdate}
          onProcessRowUpdateError={processRowUpdateError}
          initialState={{
            pagination: { paginationModel: { pageSize: 20 } },
            pinnedColumns: {
              right: ["options"],
            },
          }}
          pageSizeOptions={[10, 20, 100]}
          pagination
          slots={{ toolbar: CustomToolbar }}
          slotProps={{
            toolbar: { moreOptions: addOption },
          }}
          sx={{ backgroundColor: "white" }}
        />
      </Box>
    </Box>
  );
};
export default MenuStructure;
