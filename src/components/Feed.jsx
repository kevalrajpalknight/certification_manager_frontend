import { Box } from "@mui/material";
import React from "react";
import DataTable from "./DataTable";

// Inside your component
function Feed() {
  return (
    <Box flex={3} p={1}>
      <DataTable />
    </Box>
  );
}

export default Feed;
