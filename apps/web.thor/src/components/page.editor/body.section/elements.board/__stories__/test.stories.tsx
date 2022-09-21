import { DndContext, useDraggable } from '@dnd-kit/core';
import { css, styled } from '@mui/material';

import React from 'react';
import { restrictToWindowEdges } from '@dnd-kit/modifiers';
import { storiesOf } from '@storybook/react';
import uniqueId from 'lodash.uniqueid';

const Container = styled('div')(
  ({ theme }) => css`
    width: 100%;
    height: 50vh;
    outline: solid thin ${theme.palette.primary.main};
  `,
);

function DraggableItem(props: {
  x?: number;
  y?: number;
  id: string;
  hasPos: boolean;
}) {
  const { setNodeRef, attributes, listeners, isDragging, transform } =
    useDraggable({
      id: props.id,
    });

  const style: React.CSSProperties = {
    width: '100px',
    height: '100px',
    border: 'solid thin red',
  };
  if (props.hasPos) {
    style.position = 'absolute';
    style.left = props.x;
    style.top = props.y;
  }
  if (isDragging) {
    style.opacity = 0.2;
  }

  if (transform) {
    style.transform = `translate(${transform.x}px, ${transform.y}px)`;
  }

  return (
    <div ref={setNodeRef} {...listeners} {...attributes} style={style}>
      test
    </div>
  );
}

const Board: React.FC = () => {
  const [state, setState] = React.useState({
    [uniqueId()]: {
      x: 0,
      y: 0,
      hasPos: false,
    },
    [uniqueId()]: {
      x: 0,
      y: 0,
      hasPos: false,
    },
  });

  return (
    <Container>
      <DndContext
        modifiers={[restrictToWindowEdges]}
        onDragEnd={(element) => {
          setState((c) => ({
            ...c,
            [element.active.id]: {
              x: c[element.active.id].x + element.delta.x,
              y: c[element.active.id].y + element.delta.y,
              hasPos: true,
            },
          }));
        }}
      >
        {Object.entries(state).map(([id, { x, y, hasPos }]) => (
          <DraggableItem key={id} id={id} x={x} y={y} hasPos={hasPos} />
        ))}
      </DndContext>
    </Container>
  );
};

storiesOf('NinetySix/Page Editor/Test', module).add('Default', () => {
  return <Board />;
});
