import { createTheme, ThemeProvider } from '@mui/material';
import { Switch } from 'react-router-dom';
import { Route } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import Nav from './components/Nav';
import Login from './screens/login/Login';
import Register from './screens/register/Register';

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
      <BrowserRouter>
        <Switch>
          <Route path="/hola" component={Nav} />
          <Route path="/register" component={Register} />
          <Route path="/" component={Login} />
        </Switch>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;