import {
  Cancel,
  Delete,
  Edit,
  Save,
  SettingsOutlined,
} from "@mui/icons-material";
import { Box, IconButton } from "@mui/material";
import { GridActionsCellItem, GridRowModes } from "@mui/x-data-grid";
import React, { useEffect } from "react";

export const useTableDataGrid = (dataElements, blockData) => {
  const [rowModesModel, setRowModesModel] = React.useState({});
  const [rows, setRows] = React.useState([]);
  const [columns, setColumns] = React.useState([]);

  useEffect(() => {
    const columnsForDatagrid = dataElements.map((column) => {
      return {
        field: column.dataName,
        headerName: column.prompt,
        width: 150,
        editable: true,
      };
    });
    setColumns(columnsForDatagrid);
  }, [dataElements]);

  useEffect(() => {
    const rowsForDataGrid = blockData.map((row, index) => {
      return { ...row.initRecord, id: index };
    });
    setRows(rowsForDataGrid);
  }, [blockData]);

  const columnOptions = {
    field: "options",
    type: "actions",
    headerName: "Opciones",
    sortable: false,
    disableColumnMenu: true,
    resizable: false,
    headerClassName: "header-option",
    cellClassName: "cell-option",
    headerAlign: "center",
    renderHeader: () => <SettingsOutlined />,
    getActions: ({ id }) => {
      const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

      if (isInEditMode) {
        return [
          <GridActionsCellItem
            key="save"
            icon={<Save />}
            label="Save"
            sx={{
              color: "primary.main",
            }}
            onClick={handleSaveClick(id)}
          />,
          <GridActionsCellItem
            key="cancel"
            icon={<Cancel />}
            label="Cancel"
            className="textPrimary"
            onClick={handleCancelClick(id)}
            color="inherit"
          />,
        ];
      }

      return [
        <GridActionsCellItem
          key="edit"
          icon={<Edit />}
          label="Edit"
          className="textPrimary"
          onClick={handleEditClick(id)}
          color="inherit"
        />,
        <GridActionsCellItem
          key="delete"
          icon={<Delete />}
          label="Delete"
          onClick={handleDeleteClick(id)}
          color="inherit"
        />,
      ];
    },
    hideable: false,
  };

  const handleEditClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });
  };

  const handleSaveClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id) => () => {
    setRows(rows.filter((row) => row.id !== id));
  };

  const handleAddClick = () => {
    const id = uuidv4();
    setRows((oldRows) => [{ id, name: "", age: "", isNew: true }, ...oldRows]);
    setRowModesModel((oldModel) => ({
      [id]: { mode: GridRowModes.Edit, fieldToFocus: "name" },
      ...oldModel,
    }));
  };

  const getRowClassName = (params) => {
    return params.indexRelativeToCurrentPage % 2 !== 0
      ? ""
      : "colorRowDatagrid";
  };

  const stateVariables = { rows, columns, columnOptions, rowModesModel };
  const stateFunctions = { handleEditClick, getRowClassName };

  return { stateVariables, stateFunctions };
};
