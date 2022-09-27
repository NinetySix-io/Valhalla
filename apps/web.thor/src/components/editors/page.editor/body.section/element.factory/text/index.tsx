import * as React from 'react';

import type { TextElement } from '@app/components/editors/page.editor/types';
import { getClampPosition } from '../../elements.board/lib/get.clamp.position';
import { useSectionStore } from '../../scope.provider';

export type Props = {
  element: TextElement;
  isFocus?: boolean;
  onChange?: (element: TextElement) => void;
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
        ySpan: Math.max(
          element.ySpan,
          getClampPosition(height, store.getState().cellSize),
        ),
        props: {
          json,
          html,
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
            __html: element.props.html,
          }}
        />
      }
    >
      <Editor
        editable={isFocus}
        value={element.props.json}
        onChange={handleChange}
        onEditEnd={onEditEnd}
        onEditStart={onEditStart}
      />
    </React.Suspense>
  );
};
