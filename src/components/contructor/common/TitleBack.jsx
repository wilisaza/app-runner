import React from "react";
import { Box, IconButton, Typography } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { useRouter } from "next/navigation";

const TitleBack = ({ Title, redirect }) => {
  const router = useRouter();
  return (
    <Box
      display="flex"
      width="100%"
      alignItems="center"
      justifyContent="start"
      bgcolor="#E7E7E7"
      pl={2}
    >
      <IconButton onClick={() => router.push(`/${redirect ?? "appPage"}`)}>
        <ArrowBack />
      </IconButton>
      <Typography variant="h5">{Title ?? ""}</Typography>
    </Box>
  );
};

export default TitleBack;
