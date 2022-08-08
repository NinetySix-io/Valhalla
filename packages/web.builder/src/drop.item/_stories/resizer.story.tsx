import * as React from 'react';

import { css, styled } from '@mui/material';

import { DIRECTION } from '../directions';
import { Resizer } from '../resizer';
import { Size } from '../../types';
import { storiesOf } from '@storybook/react';

const Container = styled('div')(
  () => css`
    display: flex;
    flex-direction: column;
    align-items: center;
  `,
);

const Component: React.FC = () => {
  const minHeight = 50;
  const minWidth = 50;
  const [size, setSize] = React.useState<React.CSSProperties>({
    width: 200,
    height: 200,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  });

  function handleResize(direction: DIRECTION, nextSize: Size) {
    setSize((current) => ({
      ...current,
      ...nextSize,
    }));
  }

  return (
    <Resizer
      minHeight={minHeight}
      minWidth={minWidth}
      style={size}
      onResizeFinish={handleResize}
    >
      test
    </Resizer>
  );
};

storiesOf('Components/DropItem', module).add('Resizer', () => (
  <Container>
    <Component />
  </Container>
));
