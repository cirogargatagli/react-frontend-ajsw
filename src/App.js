import { createTheme, ThemeProvider } from '@mui/material';
import AlertProvider from './components/AlertProvider';
import { AuthContextProvider } from './context/AuthContext';
import Router from './routing/Router';

const theme = createTheme({
  palette: {
    primary: {
      main: "#84b6f4",
    },
    secondary: {
      main: "#f4fab4"
    }
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AuthContextProvider>
        <Router />
      </AuthContextProvider>
    </ThemeProvider>
  );
}

export default App;