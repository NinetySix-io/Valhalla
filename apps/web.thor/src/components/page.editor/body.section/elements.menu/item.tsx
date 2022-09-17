import { Button, Grid, css, styled } from '@mui/material';

import type { MenuElement } from '../../types';
import { useDrag } from 'react-dnd';
import { useSectionId } from '../scope.provider';

const Item = styled(Button)(
  () => css`
    justify-content: flex-start;
  `,
);

type Props = {
  children: string;
  element: MenuElement;
};

export const ElementMenuGroupItem: React.FC<Props> = ({
  children,
  element,
}) => {
  const sectionId = useSectionId();
  const [, drag] = useDrag({
    type: sectionId,
    item: element,
  });

  return (
    <Grid item md={6}>
      <Item disableRipple ref={drag} fullWidth>
        {children}
      </Item>
    </Grid>
  );
};
