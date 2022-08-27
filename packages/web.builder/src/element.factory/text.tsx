import * as React from 'react';

import { BuilderElement } from '../types/elements';
import { Droppable } from '../types';

type Props = {
  value: Droppable<BuilderElement['Text']>;
};

export const TextElement: React.FC<Props> = ({ value }) => {
  // skipcq: JS-0440
  return <div dangerouslySetInnerHTML={{ __html: value.value }} />;
};
