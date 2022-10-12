import * as React from 'react';

import { ElementType } from '@app/generated/valhalla.gql';
import type { PageElement } from '../../types';
import { TextItem } from './text';
import { useSectionStore } from '../scope.provider';

type Props = {
  element: PageElement;
  isFocus?: boolean;
  onChange?: (element: PageElement) => void;
};

export const ElementFactory: React.FC<Props> = ({
  element,
  isFocus,
  onChange,
}) => {
  const store = useSectionStore();

  if (element.type === ElementType.TEXT) {
    return (
      <TextItem
        element={element}
        isFocus={isFocus}
        onChange={onChange}
        onEditStart={() => store.actions.setIsEditingText(true)}
        onEditEnd={() => store.actions.setIsEditingText(false)}
      />
    );
  }

  return <div>{element.type}</div>;
};
