import { createTheme, ThemeProvider } from '@mui/material';
import { AuthContextProvider } from './context/AuthContext';
import { CourseContextProvider } from './context/CourseContext';
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
        <CourseContextProvider>
          <FilterContextProvider>
            <Router />
          </FilterContextProvider>
        </CourseContextProvider>
      </AuthContextProvider>
    </ThemeProvider>
  );
}

export default App;