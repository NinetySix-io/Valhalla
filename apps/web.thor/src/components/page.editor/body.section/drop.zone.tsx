import * as React from 'react';

import { Typography, css, styled } from '@mui/material';

import { useDrop } from 'react-dnd';

const Container = styled('div')(
  () => css`
    min-height: 200px;
    display: flex;
    flex-direction: column;
  `,
);

type DropItem = { id: string };
export const DropZone: React.FC = () => {
  const [drops, setDrops] = React.useState<DropItem[]>([]);
  const [, drop] = useDrop(
    () => ({
      accept: 'element',
      drop(item: { id: string }, monitor) {
        if (!monitor.didDrop()) {
          setDrops((d) => [...d, item]);
        }
      },
      collect(monitor) {
        return {
          isOver: monitor.isOver({
            shallow: true,
          }),
        };
      },
    }),
    [setDrops],
  );

  return (
    <Container ref={drop}>
      {drops.map((item, index) => (
        <Typography key={item.id + index}>{item.id}</Typography>
      ))}
    </Container>
  );
};
