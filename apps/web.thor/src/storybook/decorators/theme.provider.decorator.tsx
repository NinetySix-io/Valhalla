import type { DecoratorFn } from '@storybook/react';
import { ThemeProvider } from '@mui/material';
import { theme } from '@valhalla/web.react';

export function provideTheme(renderTheme = theme): DecoratorFn {
  return (Story) => {
    return (
      <ThemeProvider theme={renderTheme}>
        <Story />
      </ThemeProvider>
    );
  };
}
