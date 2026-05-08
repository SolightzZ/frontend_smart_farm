import { Paper } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import {
  ThemeProvider as MUIThemeProvider,
  createTheme,
  styled,
} from "@mui/material/styles";

// const theme = UseTheme();
// theme = theme.palette.primary.main
const theme = createTheme({
  palette: {
    primary: {
      main: "#10b981",
    },
    secondary: {
      main: "#f87171",
    },
    background: {
      main: "#f3f4f6",
    },
    text: {
      main: "#ffffff",
      secondary: "#000000",
    },
  },
});

export const PaperHeader = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
}));

function ThemeProvider({ children }) {
  return (
    <MUIThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MUIThemeProvider>
  );
}

export default ThemeProvider;
