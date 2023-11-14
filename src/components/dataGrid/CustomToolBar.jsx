import {
  AddBox,
  Clear,
  FileDownloadOutlined,
  Search,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Grid,
  IconButton,
  TextField,
  Tooltip,
} from "@mui/material";
import {
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarFilterButton,
  useGridApiContext,
} from "@mui/x-data-grid-premium";

const CustomToolbar = ({ moreOptions }) => {
  const apiRef = useGridApiContext();

  return (
    <GridToolbarContainer
      sx={{
        display: "flex",
        justifyContent: "space-between",
        padding: "10px 20px 10px 20px",
      }}
    >
      <Grid container>
        <Grid item xs={12} sm={5}>
          <TextField
            sx={{ width: "100%" }}
            variant="outlined"
            size="small"
            placeholder="Search…"
            autoFocus
            InputProps={{
              startAdornment: <Search fontSize="small" color="primary" />,
              endAdornment: (
                <IconButton title="Clear" aria-label="Clear" size="small">
                  <Clear fontSize="small" />
                </IconButton>
              ),
            }}
          />
        </Grid>
        <Grid item xs={12} sm={7}>
          <Box
            sx={{
              display: "flex",
              justifyContent: { xs: "center", sm: "flex-end" },
            }}
          >
            {moreOptions}

            <Tooltip title="Columnas">
              <GridToolbarColumnsButton sx={{ fontSize: { xs: 0, md: 12 } }} />
            </Tooltip>

            <GridToolbarFilterButton sx={{ fontSize: { xs: 0, md: 12 } }} />

            <Tooltip title="Espaciado">
              <GridToolbarDensitySelector
                sx={{ fontSize: { xs: 0, md: 12 } }}
              />
            </Tooltip>

            <Tooltip title="Excel">
              <Button
                sx={{ fontSize: { xs: 0, md: 12 } }}
                onClick={() => {
                  apiRef.current.exportDataAsExcel();
                }}
                startIcon={<FileDownloadOutlined />}
              >
                Excel
              </Button>
            </Tooltip>
          </Box>
        </Grid>
      </Grid>
    </GridToolbarContainer>
  );
};

export default CustomToolbar;
