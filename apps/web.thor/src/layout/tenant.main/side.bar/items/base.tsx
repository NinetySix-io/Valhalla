import * as React from 'react';

import { FaReg, Icon, useDarkMode } from '@valhalla/react';
import {
  ListItemButton,
  ListItemIcon,
  ListItemText,
  css,
  styled,
  useTheme,
} from '@mui/material';

type Props = React.ComponentProps<typeof ListItemButton> & {
  icon: React.ReactElement | FaReg.IconDefinition;
};

const Container = styled(ListItemButton)(
  ({ theme }) => css`
    padding: ${theme.spacing(2)};
  `,
);

const Text = styled(ListItemText)(
  ({ theme }) => css`
    color: ${theme.palette.mode === 'dark'
      ? theme.palette.common.black
      : theme.palette.common.white};
  `,
);

const IconWrapper = styled(ListItemIcon)`
  padding-left: 3px;
`;

export const SidebarItem: React.FC<Props> = ({ icon, children, ...props }) => {
  const isDarkMode = useDarkMode();
  const theme = useTheme();
  const color = isDarkMode
    ? theme.palette.common.black
    : theme.palette.common.white;

  const ItemIcon = React.useMemo(() => {
    const style: React.CSSProperties = {
      paddingRight: theme.spacing(2),
    };

    if (React.isValidElement(icon)) {
      return React.cloneElement(icon, { color });
    }

    return <Icon icon={icon} color={color} fontSize={20} style={style} />;
  }, [icon, color, theme]);

  return (
    <Container {...props}>
      <IconWrapper>{ItemIcon}</IconWrapper>
      <Text>{children}</Text>
    </Container>
  );
};
