import { createTheme, ThemeProvider } from '@mui/material';
import { AuthContextProvider } from './context/AuthContext';
import { FilterContextProvider } from './context/FilterContext';
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
        <FilterContextProvider>
          <Router />
        </FilterContextProvider>
      </AuthContextProvider>
    </ThemeProvider>
  );
}

export default App;