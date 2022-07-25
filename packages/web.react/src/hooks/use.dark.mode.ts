import { useTheme } from '@mui/material';

/**
 * It returns true if the current theme is dark mode, and false if it's light mode
 */
export function useDarkMode() {
  const theme = useTheme();
  return theme.palette.mode === 'dark';
}
