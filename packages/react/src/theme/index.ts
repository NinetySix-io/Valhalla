import { createTheme, responsiveFontSizes } from "@mui/material/styles";

import createCache from "@emotion/cache";
import { red } from "@mui/material/colors";

export const theme = responsiveFontSizes(
  createTheme({
    palette: {
      primary: {
        main: "#556cd6",
      },
      secondary: {
        main: "#19857b",
      },
      error: {
        main: red.A400,
      },
    },
  })
);

// prepend: true moves MUI styles to the top of the <head> so they're loaded first.
// It allows developers to easily override MUI styles with other styling solutions, like CSS modules.
export function createEmotionCache() {
  return createCache({ key: "css", prepend: true });
}
