import {
  Box,
  Stack,
  ThemeProvider,
} from "@mui/material";
import Feed from "./components/Feed";
import { lightTheme } from "./components/theme";

function App() {

  return (
    <ThemeProvider theme={lightTheme}>
      <Box
        margin={0}
        padding={0}
        sx={{
          backgroundColor: lightTheme.palette.primary.body,
        }}
      >
        <Stack spacing={2} direction={"row"}>
          <Feed />
        </Stack>
      </Box>
    </ThemeProvider>
  );
}

export default App;
