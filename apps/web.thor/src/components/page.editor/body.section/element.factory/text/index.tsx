import * as React from 'react';

import type { BoardElement } from '@app/components/page.editor/types';

export type Props = {
  element: BoardElement<string, { value: string }>;
};

export const TextItem: React.FC<Props> = ({ element }) => {
  return <div>text</div>;
};
