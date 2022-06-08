import { createTheme, responsiveFontSizes } from '@mui/material/styles';

import createCache from '@emotion/cache';
import { red } from '@mui/material/colors';

const BORDER_RADIUS = 10;

export const theme = responsiveFontSizes(
  createTheme({
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: BORDER_RADIUS,
          },
        },
      },
      MuiInput: {
        styleOverrides: {
          root: {
            borderRadius: BORDER_RADIUS,
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            borderRadius: BORDER_RADIUS,
          },
        },
      },
      MuiFilledInput: {
        styleOverrides: {
          root: {
            borderRadius: BORDER_RADIUS,
          },
        },
      },
    },
    typography: {
      h1: {
        fontSize: 40,
      },
    },
    palette: {
      text: {
        primary: '#000',
        secondary: '#000',
        disabled: '#ccc',
      },
      background: {
        default: '#fff',
        // paper
      },
      primary: {
        main: '#000',
        // light;
        // dark;
        // contrastText;
      },
      secondary: {
        main: '#19857b',
      },
      error: {
        main: red.A400,
      },
    },
  }),
);

// prepend: true moves MUI styles to the top of the <head> so they're loaded first.
// It allows developers to easily override MUI styles with other styling solutions, like CSS modules.
export function createEmotionCache() {
  return createCache({
    key: 'css',
    prepend: true,
  });
}
