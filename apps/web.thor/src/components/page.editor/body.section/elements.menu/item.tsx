import { Button, Grid, css, styled } from '@mui/material';

import { ELEMENT } from '../constants';
import { useDrag } from 'react-dnd';

const Item = styled(Button)(
  () => css`
    justify-content: flex-start;
  `,
);

type Props = { children: string };
export const ElementMenuGroupItem: React.FC<Props> = ({ children }) => {
  const [, drag] = useDrag(() => ({
    type: ELEMENT,
    item: {
      id: children,
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
