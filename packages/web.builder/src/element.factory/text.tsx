import * as React from 'react';

import type { BuilderElement } from '../types/elements';
import type { Droppable } from '../types';

type Props = {
  value: Droppable<BuilderElement['Text']>;
};

export const TextElement: React.FC<Props> = ({ value }) => {
  // skipcq: JS-0440
  return <div dangerouslySetInnerHTML={{ __html: value.value }} />;
};
