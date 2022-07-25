import { Button, Grid, css, styled } from '@mui/material';

import { BUILDER_ELEMENT } from '../../constants';
import { BuilderElement } from '../../types';
import { useDrag } from 'react-dnd';

const Item = styled(Button)(
  () => css`
    justify-content: flex-start;
  `,
);

type Props = {
  children: string;
  element: BuilderElement;
};

export const ElementMenuGroupItem: React.FC<Props> = ({
  children,
  element,
}) => {
  const [, drag] = useDrag({
    type: BUILDER_ELEMENT,
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
