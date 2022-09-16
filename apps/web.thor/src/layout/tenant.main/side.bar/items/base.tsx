import * as React from 'react';

import {
  ListItemButton,
  ListItemText,
  Popover,
  css,
  styled,
} from '@mui/material';

import { useDebounce } from '@valhalla/web.react';

const Container = styled(ListItemButton)(
  ({ theme }) => css`
    padding: ${theme.spacing(2)};
  `,
);

const Text = styled(ListItemText)(
  ({ theme }) => css`
    margin: 0;
    line-height: normal;
    color: ${theme.palette.mode === 'dark'
      ? theme.palette.common.white
      : theme.palette.common.black};

    > * {
      line-height: 0;
      font-size: 20px;
    }
  `,
);

type Props = React.ComponentProps<typeof ListItemButton> & {
  popoverContent?: React.ReactElement;
};

export const SidebarItem: React.FC<Props> = React.forwardRef(
  ({ children, popoverContent, ...props }, ref) => {
    const [anchor, setAnchor] = useDebounce<HTMLElement>(null, 500);
    const textRef = React.useRef<HTMLElement>(null);

    function handleAnchor(target?: HTMLElement | null) {
      if (popoverContent) {
        setAnchor(target);
      }
    }

    return (
      <React.Fragment>
        <Container
          {...props}
          ref={ref}
          onMouseOver={() => handleAnchor(textRef.current)}
          onMouseLeave={() => handleAnchor(null)}
        >
          <Text ref={textRef}>{children}</Text>
        </Container>
        {popoverContent && (
          <Popover
            disableRestoreFocus
            onClose={() => handleAnchor(null)}
            open={Boolean(anchor)}
            anchorEl={anchor}
            anchorOrigin={{
              vertical: 'center',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'center',
              horizontal: 'left',
            }}
          >
            {popoverContent}
          </Popover>
        )}
      </React.Fragment>
    );
  },
);
