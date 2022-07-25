import * as React from 'react';

import { Fade, Paper, Popper, PopperProps, css, styled } from '@mui/material';

const Marker = styled('div')(() => css``);

const Container = styled(Paper)(
  ({ theme }) => css`
    padding: ${theme.spacing(1)};
  `,
);

type Props = Pick<PopperProps, 'open'> & {
  containerRef?: React.Ref<HTMLDivElement>;
  children: React.ReactNode;
  style?: React.CSSProperties;
  placement?: PopperProps['placement'];
};

export const EditorMenu: React.FC<Props> = ({
  open,
  placement,
  children,
  containerRef,
  style,
}) => {
  const marker = React.useRef<HTMLDivElement>();

  return (
    <React.Fragment>
      <Marker style={style} ref={marker} />
      <Popper
        transition
        open={open}
        anchorEl={marker.current}
        placement={placement}
      >
        {({ TransitionProps }) => {
          return (
            <Fade {...TransitionProps} timeout={350}>
              <Container ref={containerRef}>{children}</Container>
            </Fade>
          );
        }}
      </Popper>
    </React.Fragment>
  );
};