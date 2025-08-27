import { createTheme, ThemeProvider } from "@mui/material";
import Layout from "./components/Layout/Layout";
import Main from "./components/Main/Main";

const theme = createTheme({
  typography: {
    fontFamily: "Nunito"
  }
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Layout>
        <Main />
      </Layout>
    </ThemeProvider>
  );
};

export default App;
