import { Box, Button } from "@mui/material";
import {
  DataGridPremium,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarDensitySelector,
  GridToolbarExport,
} from "@mui/x-data-grid-premium";
import React, { use } from "react";
import { useTableDataGrid } from "./hooks";
import { AddBox, AddBoxOutlined } from "@mui/icons-material";

const CustomToolbar = () => {
  return (
    <GridToolbarContainer sx={{ display: "flex", justifyContent: "flex-end" }}>
      <Button startIcon={<AddBox />} size="small">
        Agregar
      </Button>
      <GridToolbarColumnsButton />
      <GridToolbarFilterButton />
      <GridToolbarDensitySelector />
      <GridToolbarExport />
    </GridToolbarContainer>
  );
};

export const TableDataGrid = ({ dataElements, blockData }) => {
  console.log(
    "🚀 ~ file: TableDataGrid.jsx:29 ~ TableDataGrid ~ blockData:",
    blockData
  );
  console.log(
    "🚀 ~ file: TableDataGrid.jsx:29 ~ TableDataGrid ~ dataElements:",
    dataElements
  );
  const { stateVariables, stateFunctions } = useTableDataGrid(
    dataElements,
    blockData
  );

  const { getRowClassName } = stateFunctions;

  const { rows, columns, columnOptions, rowModesModel } = stateVariables;

  return (
    <Box height="calc(100vh - 300px)">
      <DataGridPremium
        rows={rows}
        getRowClassName={getRowClassName}
        columns={[...columns, columnOptions]}
        rowModesModel={rowModesModel}
        editMode="row"
        initialState={{
          pagination: { paginationModel: { pageSize: 10 } },
          pinnedColumns: {
            right: ["options"],
          },
        }}
        pageSizeOptions={[10, 25, 100]}
        pagination
        slots={{
          toolbar: CustomToolbar,
        }}
        disableRowSelectionOnClick
      />
    </Box>
  );
};
