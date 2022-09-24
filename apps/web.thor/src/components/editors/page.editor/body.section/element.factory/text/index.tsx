import * as React from 'react';

import type { BoardElement } from '@app/components/editors/page.editor/types';

export type Props = {
  element: BoardElement<string, { value: string }>;
  isFocus?: boolean;
};

export const TextItem: React.FC<Props> = ({ element, isFocus }) => {
  if (isFocus) {
    return <div>Focus!</div>;
  }

  return (
    <div
      dangerouslySetInnerHTML={{
        __html: element.props.value,
      }}
    />
  );
};
