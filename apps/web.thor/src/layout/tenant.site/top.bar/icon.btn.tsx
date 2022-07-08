import * as React from 'react';

import { Icon, cProps } from '@valhalla/react';
import {
  IconButton,
  IconButtonProps,
  Tooltip,
  css,
  styled,
  useTheme,
} from '@mui/material';

const Container = styled(IconButton)(
  () => css`
    min-width: 40px;
    min-height: 40px;
  `,
);

type Props = cProps<
  Pick<React.ComponentProps<typeof Icon>, 'icon' | 'rotation'> & {
    tip?: string;
  }
> &
  IconButtonProps;

export const IconBtn: React.FC<Props> = ({ icon, rotation, tip, ...props }) => {
  const theme = useTheme();

  const Btn = (
    <Container {...props}>
      <Icon
        icon={icon}
        rotation={rotation}
        fontSize={theme.typography.body1.fontSize}
      />
    </Container>
  );

  if (tip) {
    return <Tooltip title={tip}>{Btn}</Tooltip>;
  }

  return Btn;
};
