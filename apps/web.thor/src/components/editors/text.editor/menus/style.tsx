import { Button, css, styled } from '@mui/material';

import type { ButtonProps } from '@mui/material';
import { makeFilterProps } from '@valhalla/web.react';

export const MenuContainer = styled('div')(
  ({ theme }) => css`
    background-color: ${theme.palette.background.paper};
    border-radius: ${theme.shape.borderRadius};
    box-shadow: ${theme.shadows[2]};
    width: max-content;
    height: max-content;
    padding: 3px;
    opacity: 0.9;
    transition: ${theme.transitions.create('all')};

    &:hover {
      opacity: 1;
    }
  `,
);

export const ActionButton = styled(
  ({ onClick, ...props }: ButtonProps) => (
    <Button
      size="small"
      onMouseDown={(event) => {
        event.preventDefault();
        onClick?.(event);
      }}
      {...props}
    />
  ),
  makeFilterProps(['isActive']),
)<{ isActive: boolean }>(
  ({ theme, isActive }) => css`
    color: ${isActive ? theme.palette.action.active : theme.palette.grey[500]};
    min-width: 40px;
  `,
);
