import { css, styled } from '@mui/material';

import { ScreenSize } from './constants';
import { makeFilterProps } from '@valhalla/web.react';

export const Container = styled(
  'div',
  makeFilterProps(['size']),
)<{ size: ScreenSize }>(
  ({ theme, size }) => css`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    flex-grow: 1;
    overflow: auto;
    transition: all 0.5s;
    align-self: center;

    ${size === ScreenSize.DESKTOP &&
    css`
      width: 100%;
      height: 100%;
    `}

    ${size < ScreenSize.DESKTOP &&
    css`
      max-width: ${size}px;
      outline: solid thin ${theme.palette.grey[200]};
      border-radius: ${theme.shape.borderRadius};
      margin: ${theme.spacing(1)} 0;
    `}

      ${size === ScreenSize.MOBILE &&
    css`
      min-height: 844px;
    `}

      ${size === ScreenSize.TABLET &&
    css`
      min-height: 1180px;
    `};
  `,
);
