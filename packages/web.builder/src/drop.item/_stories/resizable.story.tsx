import * as React from 'react';

import { Resizable } from 're-resizable';
import { storiesOf } from '@storybook/react';

const Component: React.FC = () => {
  const [size, setSize] = React.useState({ width: 200, height: 200 });
  const border = 'solid thin #ccc';

  return (
    <Resizable
      size={size}
      style={{ border }}
      onResizeStop={(_e, _direction, _ref, dimension) => {
        setSize((current) => ({
          width: current.width + dimension.width,
          height: current.height + dimension.height,
        }));
      }}
    >
      test
    </Resizable>
  );
};

storiesOf('Resizable', module).add('default', () => <Component />);
