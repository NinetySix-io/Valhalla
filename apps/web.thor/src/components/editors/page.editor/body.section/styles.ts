import { css, styled } from '@mui/material';

import { makeFilterProps } from '@valhalla/web.react';

export const Container = styled(
  'section',
  makeFilterProps(['isHover']),
)<{
  isHover: boolean;
}>(
  ({ theme, isHover }) => css`
    width: 100%;
    position: relative;
    display: flex;
    flex-direction: column;
    transition: all 0.2s;
    border: solid 2px transparent;
    margin-top: -2px;

    ${isHover &&
    css`
      border-color: ${theme.palette.primary.main};
    `}
  `,
);

export const MenuArea = styled(
  'div',
  makeFilterProps(['isMobile']),
)<{
  isMobile: boolean;
}>(
  ({ theme, isMobile }) => css`
    position: absolute;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    top: 0;

    ${isMobile
      ? css`
          left: -${theme.spacing(2)};
          right: -${theme.spacing(2)};
        `
      : css`
          left: 0;
          right: 0;
          padding: ${theme.spacing(2)};
        `}

    > * {
      width: 5px;
      height: 5px;
    }
  `,
);
