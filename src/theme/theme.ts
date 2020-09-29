import { createMuiTheme, Theme } from '@material-ui/core/styles';
import { grey } from '@material-ui/core/colors';

// theme (for material-ui)
const lightTheme: Theme = createMuiTheme({
  typography: {
    fontSize: 12,
  },
  palette: {
    // primary: {},
    secondary: {
      light: grey[300],
      main: grey[500],
      dark: grey[700],
    },
    background: {
      default: '#ddd',
      paper: '#fff',
    },
  },
});

const darkTheme = createMuiTheme({
  typography: {
    fontSize: 12,
  },
  palette: {
    type: 'dark',
    // primary: {},
    secondary: {
      light: grey[300],
      main: grey[500],
      dark: grey[700],
    },
    background: {
      default: '#111',
      paper: '#222',
    },
  },
});

export { lightTheme, darkTheme };
