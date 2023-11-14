"use client";
import React, { useEffect } from "react";
import { useStoreActions, useStoreState } from "easy-peasy";
import { GridRowModes } from "@mui/x-data-grid";
import { SettingsOutlined } from "@mui/icons-material";
import { useGridApiRef } from "@mui/x-data-grid-premium";
import { APPLICATION_API } from "@/constants";
import fetchFunctions from "@/functions/fetchFunctions";
import RowMenu from "./RowMenu";

const useMenuStructure = () => {
  const appLogin = useStoreState((state) => state.appLogin.appLoginData);
  const setCallSnackbar = useStoreActions(
    (actions) => actions.snackbarCommon.setCallSnackbar
  );

  const [rows, setRows] = React.useState([]);
  const [rowModesModel, setRowModesModel] = React.useState({});
  const apiRef = useGridApiRef();

  const [menuData, setMenuData] = React.useState([]);

  const getAppStruct = async () => {
    console.log("Entra a getAppStruct");
    let fetchObj = {
      url: APPLICATION_API,
      metodo: "GET",
      objetoDb: `application/runnerStruct/${appLogin?.idApplication}`,
      token: appLogin.token,
    };
    const fetchAppStruct = await fetchFunctions.fetchApi(fetchObj);
    // Acá debe ir validación para el parámetro / vencimiento del token
    if (fetchAppStruct.success) {
      setMenuData(fetchAppStruct);
    }

    console.log("fetchAppStruct", fetchAppStruct);
  };

  const postNewItemMenu = async (newItem) => {
    let fetchObj = {
      url: APPLICATION_API,
      metodo: "POST",
      objetoDb: `menuapp`,
      token: appLogin.token,
      body: newItem,
    };
    console.log("appLogin", appLogin);
    const postNewOption = await fetchFunctions.fetchApi(fetchObj);
    // Acá debe ir validación para el parámetro / vencimiento del token
    if (postNewOption.success) {
      setCallSnackbar({
        typeMessage: "success",
        open: true,
        vertical: "bottom",
        horizontal: "right",
        duration: 1500,
        message: "Item de menu creado correctamente",
      });
    } else {
      setCallSnackbar({
        typeMessage: "error",
        open: true,
        vertical: "bottom",
        horizontal: "right",
        duration: null,
        message:
          "Error al crear item de menu, intente nuevamente o comuniquese con el administrador del sistema",
      });
    }
    console.log("postNewOption", postNewOption);
  };

  useEffect(() => {
    getAppStruct();
  }, [appLogin]);

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

  const handleUpdateRows = () => {
    const rowIds = apiRef.current.getRowModels();
    const rowsArray = Array.from(rowIds.values());
    const newRows = rowsArray.filter((row) => row.isNew);
    const rowsToAdd = newRows.map((row) => {
      if (row.execCall === "")
        return {
          idApplication: appLogin.idApplication,
          menuGroup: "LEFT",
          idParent: row.idParent,
          optionName: row.name,
          description: "Conexión remota",
          execType: "FORM",
          execParams: null,
        };
      return {
        idApplication: appLogin.idApplication,
        menuGroup: "LEFT",
        idParent: row.idParent,
        optionName: row.name,
        description: "Conexión remota",
        execType: "FORM",
        execCall: row.execCall,
        execParams: null,
      };
    });
    const newRowsUpdate = rowsToAdd.map((row) => {
      postNewItemMenu(row);
    });
  };

  const handleAddClick = (isMenu) => {
    const id = crypto.randomUUID();
    apiRef.current.updateRows([
      {
        id: id,
        idParent: "82bed01e-cf4e-41ea-9896-fa7de818a539",
        hierarchy: [`${crypto.randomUUID()}`],
        name: "Nuevo Campo",
        execCall: "",
        isMenu: isMenu ?? false,
        isNew: true,
      },
    ]);
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleAddChild = (hierarchy, isMenu, idParent) => () => {
    const id = crypto.randomUUID();
    apiRef.current.updateRows([
      {
        id: id,
        idParent: idParent,
        hierarchy: [...hierarchy, `${crypto.randomUUID()}`],
        name: "Nuevo Campo",
        execCall: "",
        isMenu: isMenu ?? false,
        isNew: true,
      },
    ]);

    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleEditClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });
  };

  const handleSaveClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, isEdited: true },
    });
  };

  const handleDeleteClick = (name, id) => () => {
    const rowIds = apiRef.current.getRowModels();
    const rowsArray = Array.from(rowIds.values());

    const rowsForDelete = rowsArray.filter(
      (row) => row.hierarchy.includes(name) || row.id === id
    );
    rowsForDelete.forEach((row) => {
      apiRef.current.updateRows([{ id: row.id, _action: "delete" }]);
    });
  };

  const getRowClassName = (params) => {
    if (params.row.isNew) return "new-row";
    if (rowModesModel[params.row.id]?.isEdited) return "edited-row";
    else if (params.row.isMenu || params.row?.hierarchy?.length > 1)
      return "group-row";
    else if (params.indexRelativeToCurrentPage % 2 !== 0)
      return "colorRowDatagrid";
  };

  const CreateRowsForDataGrid = (menu, hierarchy = []) => {
    const result = [];
    menu?.forEach((item) => {
      const currentHierarchy = [...hierarchy, item.optionName];
      result.push({
        id: item.id,
        idParent: item.idParent,
        name: item.optionName,
        hierarchy: currentHierarchy,
        execCall: item.execCall,
        isMenu: item.subMenu.length > 0,
      });
      if (item.subMenu.length > 0) {
        result.push(...CreateRowsForDataGrid(item.subMenu, currentHierarchy));
      }
    });
    return result;
  };

  useEffect(() => {
    if (menuData) {
      const rowsForDatagrid = CreateRowsForDataGrid(
        menuData.data?.menu[0].subMenu
      );

      setRows(rowsForDatagrid);
    }
  }, [menuData]);

  const columns = [
    ,
    {
      field: "name",
      headerName: "Nombre",
      width: 250,
      editable: true,
    },
    {
      field: "execCall",
      headerName: "ID Componente",
      width: 250,
      editable: true,
    },
    {
      field: "options",
      headerName: "Opciones",
      sortable: false,
      disableColumnMenu: true,
      resizable: false,
      width: 150,
      headerClassName: "header-option",
      cellClassName: "cell-option",
      headerAlign: "center",
      renderHeader: () => <SettingsOutlined />,
      renderCell: (params) => {
        return (
          <RowMenu
            id={params.row.id}
            row={params.row}
            hierarchy={params.row.hierarchy}
            rowModesModel={rowModesModel}
            handleAddChild={handleAddChild}
            handleEditClick={handleEditClick}
            handleDeleteClick={handleDeleteClick}
            handleClick={handleClick}
            handleSaveClick={handleSaveClick}
            handleCancelClick={handleCancelClick}
          />
        );
      },

      hideable: false,
    },
  ];

  const processRowUpdate = (newRows, oldRows) => {
    return newRows;
  };
  const processRowUpdateError = (params) => {
    console.error(
      "🚀 ~ file: hooks.js:193 ~ processRowUpdateError ~ params:",
      params
    );
  };

  const stateVariables = {
    rows,
    columns,
    rowModesModel,
    apiRef,
    anchorEl,
    open,
  };
  const stateFuntions = {
    handleAddClick,
    getRowClassName,
    handleClick,
    handleClose,
    processRowUpdate,
    processRowUpdateError,
    handleUpdateRows,
  };
  return { stateVariables, stateFuntions };
};

export default useMenuStructure;
