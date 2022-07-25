import * as React from 'react';

import { Droppable, DroppableElement } from '../types';

import { TextElement } from './text';

type Props = {
  value: Droppable<DroppableElement>;
};

export const ElementFactory: React.FC<Props> = ({ value }) => {
  if (value.type === 'text') {
    return <TextElement value={value} />;
  }

  return null;
};
