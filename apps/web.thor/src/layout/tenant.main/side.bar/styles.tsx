import { Divider, List, css, styled } from '@mui/material';

import { makeFilterProps } from '@valhalla/web.react';

export const Container = styled('div')(
  () => css`
    display: flex;
    flex-direction: row;
  `,
);

export const Content = styled(
  'div',
  makeFilterProps(['expanded']),
)<{ expanded: boolean }>(
  ({ theme }) => css`
    display: flex;
    flex-grow: 1;
    border-right: solid thin ${theme.palette.divider};
    overflow: hidden;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    transition: all 0.1s;

    > * {
      width: 100%;
    }
  `,
);

export const Header = styled(List)`
  padding: 0;
`;

export const Footer = styled(List)`
  padding: 0;
`;

export const SidebarDivider = styled(Divider)(
  ({ theme }) => css`
    background-color: ${theme.palette.divider};
  `,
);

export const Body = styled(List)(
  ({ theme }) => css`
    flex-grow: 1;
    justify-content: flex-start;
    padding: ${theme.spacing(1)} 0;
  `,
);
