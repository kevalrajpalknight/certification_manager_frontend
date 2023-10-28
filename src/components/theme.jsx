import { createTheme } from "@mui/material/styles";

const lightTheme = createTheme({
  palette: {
    primary: {
      light: "#d0d2fb",
      main: "#9095eb",
      dark: "#6366f1",
      hover: "#9095eb",
      body: "#fff",
      contrastText: "#fff",
    },
    secondary: {
      light: "#fff",
      main: "#673ab7",
      dark: "#512da8",
      hover: "#dfdfdf",
      contrastText: "#fff",
    },
    
    type: "light",
    background: {
      default: "#cacaca", // Set the body color for the dark theme
    },
  },
});
export { lightTheme };
