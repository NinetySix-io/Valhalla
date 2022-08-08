import * as React from 'react';

import { css, styled } from '@mui/material';

import { Resizer } from '../resizer';
import { storiesOf } from '@storybook/react';

const Container = styled('div')(
  () => css`
    display: flex;
    flex-direction: column;
    align-items: center;
  `,
);

const Component: React.FC = () => {
  const [size, setSize] = React.useState<React.CSSProperties>({
    width: 200,
    height: 200,
  });

  return (
    <Resizer style={size} onResize={(nextSize) => setSize(nextSize)}>
      test
    </Resizer>
  );
};

storiesOf('Components/DropItem', module).add('Resizer', () => (
  <Container>
    <Component />
  </Container>
));
