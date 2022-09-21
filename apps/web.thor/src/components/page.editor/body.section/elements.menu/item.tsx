import { Button, Grid, css, styled } from '@mui/material';

import type { MenuElement } from '../../types';

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
  // element,
}) => {
  // const sectionId = useSectionId();

  return (
    <Grid item md={6}>
      <Item disableRipple fullWidth>
        {children}
      </Item>
    </Grid>
  );
};
