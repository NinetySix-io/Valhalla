import * as React from 'react';

import { css, styled } from '@mui/material';

import { makeFilterProps } from '@valhalla/web.react';

const Container = styled(
  'div',
  makeFilterProps(['isVisible', 'placement']),
)<{ isVisible: boolean; placement: Props['placement'] }>(
  ({ theme, isVisible, placement }) => css`
    padding: ${theme.spacing(1)};
    position: absolute;
    opacity: ${isVisible ? 1 : 0};
    transition: ${theme.transitions.create('opacity')};
    width: max-content;
    height: max-content;
    box-shadow: ${theme.shadows[1]};
    border-radius: ${theme.shape.borderRadius};
    z-index: 1;

    ${placement === 'left' &&
    css`
      left: ${theme.spacing(1)};
    `}

    ${placement === 'right' &&
    css`
      right: ${theme.spacing(1)};
    `}
  `,
);

type Props = {
  isVisible: boolean;
  children: React.ReactNode;
  style?: React.CSSProperties;
  placement?: 'left' | 'right';
};

export const EditorMenu = React.forwardRef<HTMLDivElement, Props>(
  ({ children, isVisible, placement }, ref) => {
    return (
      <Container ref={ref} isVisible={isVisible} placement={placement}>
        {children}
      </Container>
    );
  },
);
