import * as React from 'react';

import type { PageElementTextSchema } from '@app/generated/valhalla.gql';
import { getClampPosition } from '../../elements.board/lib/get.clamp.position';
import { useSectionStore } from '../../scope.provider';

export type Props = {
  element: PageElementTextSchema;
  isFocus?: boolean;
  onChange?: (element: PageElementTextSchema) => void;
  onEditStart?: () => void;
  onEditEnd?: () => void;
};

const Editor = React.lazy(() =>
  import('@app/components/editors/text.editor').then((r) => ({
    default: r.TextEditor,
  })),
);

export const TextItem: React.FC<Props> = ({
  element,
  isFocus,
  onChange,
  onEditStart,
  onEditEnd,
}) => {
  const store = useSectionStore();
  const handleChange = React.useCallback(
    ({
      json,
      html,
      height,
    }: Parameters<React.ComponentProps<typeof Editor>['onChange']>[0]) => {
      onChange?.({
        ...element,
        json,
        html,
        desktop: {
          ...element.desktop,
          height: Math.max(
            element.desktop.height,
            getClampPosition(height, store.getState().cellSize),
          ),
        },
      });
    },
    [element, onChange, store],
  );

  return (
    <React.Suspense
      fallback={
        <div
          // skipcq: JS-0440
          dangerouslySetInnerHTML={{
            __html: element.html,
          }}
        />
      }
    >
      <Editor
        editable={isFocus}
        value={element.json}
        onChange={handleChange}
        onEditEnd={onEditEnd}
        onEditStart={onEditStart}
      />
    </React.Suspense>
  );
};
