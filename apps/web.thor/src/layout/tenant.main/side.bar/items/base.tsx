import * as React from 'react';

import { FaReg, Icon, useDarkMode, useDebounce } from '@valhalla/react';
import {
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Popover,
  css,
  styled,
  useTheme,
} from '@mui/material';

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

const IconWrapper = styled(ListItemIcon)`
  padding-left: 3px;
`;

type Props = React.ComponentProps<typeof ListItemButton> & {
  icon: React.ReactElement | FaReg.IconDefinition;
  popoverContent?: React.ReactElement;
};

export const SidebarItem: React.FC<Props> = ({
  icon,
  children,
  popoverContent,
  ...props
}) => {
  const isDarkMode = useDarkMode();
  const theme = useTheme();
  const [anchor, setAnchor] = useDebounce<HTMLElement>(null, 500);
  const textRef = React.useRef<HTMLElement>(null);
  const color = isDarkMode
    ? theme.palette.common.white
    : theme.palette.common.black;

  const ItemIcon = React.useMemo(() => {
    const style: React.CSSProperties = {
      paddingRight: theme.spacing(2),
    };

    if (React.isValidElement(icon)) {
      return React.cloneElement(icon, { color });
    }

    return <Icon icon={icon} color={color} fontSize={20} style={style} />;
  }, [icon, color, theme]);

  function handleAnchor(target?: HTMLElement | null) {
    if (popoverContent) {
      setAnchor(target);
    }
  }

  return (
    <React.Fragment>
      <Container
        {...props}
        onMouseOver={() => handleAnchor(textRef.current)}
        onMouseLeave={() => handleAnchor(null)}
      >
        <IconWrapper>{ItemIcon}</IconWrapper>
        <Text ref={textRef}>{children}</Text>
      </Container>
      {popoverContent && (
        <Popover
          disableRestoreFocus
          onClose={() => handleAnchor(null)}
          sx={{ pointerEvents: 'none' }}
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
};
