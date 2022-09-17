import * as React from 'react';

import type { DroppedElement } from '../../types';

type Props = {
  element: DroppedElement;
};

export const ElementFactory: React.FC<Props> = ({ element }) => {
  if (element.type === 'Text') {
    return <div>Text[{element.id}]</div>;
  } else if (element.type === 'Button') {
    return <div>button[{element.id}]</div>;
  }

  return <div>other</div>;
};
