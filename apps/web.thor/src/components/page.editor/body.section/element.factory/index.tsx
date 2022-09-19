import * as React from 'react';

import type { DroppedElement, MenuElement } from '../../types';

import { TextItem } from './text';

type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  element: DroppedElement<MenuElement<string, any>>;
};

export const ElementFactory: React.FC<Props> = ({ element }) => {
  if (element.type === 'Text') {
    return <TextItem element={element} />;
  } else if (element.type === 'Button') {
    return <div>button[{element.id}]</div>;
  }

  return <div>other</div>;
};
