import * as React from 'react';

import type { BoardElement, TextElement } from '../../types';

import { ElementType } from '@app/generated/valhalla.gql';
import { TextItem } from './text';
import { useSectionStore } from '../scope.provider';

type Props = {
  element: BoardElement;
  isFocus?: boolean;
  onChange?: (element: BoardElement) => void;
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
        element={element as TextElement}
        isFocus={isFocus}
        onChange={onChange}
        onEditStart={() => store.actions.setIsEditingText(true)}
        onEditEnd={() => store.actions.setIsEditingText(false)}
      />
    );
  } else if (element.type === ElementType.BOX) {
    return (
      <button type="button" title={element.id}>
        button
      </button>
    );
  }

  return <div>{element.type}</div>;
};
