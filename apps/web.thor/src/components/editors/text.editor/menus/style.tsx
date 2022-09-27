import { Button, css, styled } from '@mui/material';

import { makeFilterProps } from '@valhalla/web.react';

export const MenuContainer = styled('div')(
  ({ theme }) => css`
    background-color: ${theme.palette.background.paper};
    border-radius: ${theme.shape.borderRadius};
    box-shadow: ${theme.shadows[2]};
    padding: 3px;
  `,
);

export const ActionButton = styled(
  Button,
  makeFilterProps(['isActive']),
)<{ isActive: boolean }>(
  ({ theme, isActive }) => css`
    color: ${isActive ? theme.palette.action.active : theme.palette.grey[500]};
    min-width: 40px;
  `,
);

ActionButton.defaultProps = {
  size: 'small',
};
