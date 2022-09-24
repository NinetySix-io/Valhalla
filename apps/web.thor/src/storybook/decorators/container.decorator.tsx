import type { Theme as AppTheme } from '@valhalla/web.react';
import type { DecoratorFn } from '@storybook/react';
import React from 'react';
import { merge } from 'merge-anything';
import { useTheme } from '@mui/material';

type Options = {
  outline?: boolean;
  style?: React.CSSProperties | ((_theme: AppTheme) => React.CSSProperties);
};

export function withContainer(options?: Options): DecoratorFn {
  return (Story) => {
    const theme = useTheme<AppTheme>();
    const style = React.useMemo(() => {
      const composition: React.CSSProperties[] = [
        options?.outline && {
          borderRadius: theme.shape.borderRadius,
          outline: `solid thin ${theme.palette.grey[500]}`,
        },
        typeof options['style'] === 'function'
          ? options.style(theme)
          : options.style,
      ].filter((value) => !!value);

      return merge({}, ...composition);
    }, [theme]);

    return (
      <div style={style}>
        <Story />
      </div>
    );
  };
}
