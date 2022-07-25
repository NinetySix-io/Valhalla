import { Button, Grid, css, styled } from '@mui/material';

import { ELEMENT } from '../../constants';
import { SectionDrop } from '@app/redux/slices/editor';
import { useDrag } from 'react-dnd';

const Item = styled(Button)(
  () => css`
    justify-content: flex-start;
  `,
);

type Props = {
  children: string;
  type: string;
};

export const ElementMenuGroupItem: React.FC<Props> = ({ children, type }) => {
  const [, drag] = useDrag<Omit<SectionDrop, 'id'>>(() => ({
    type: ELEMENT,
    item: {
      type,
    },
  }));

  return (
    <Grid item md={6}>
      <Item disableRipple ref={drag} fullWidth>
        {children}
      </Item>
    </Grid>
  );
};
