import { Box, Stack } from "@mui/material";
import Feed from "./components/Feed";

function App() {
  return (
    <Box margin={0} padding={0}>
      <Stack spacing={2} direction={"row"}>
        <Feed />
      </Stack>
    </Box>
  );
}

export default App;
