import * as React from 'react';

import type { HTMLContent, JSONContent } from '@tiptap/react';

import type { BoardElement } from '@app/components/editors/page.editor/types';

export type Props = {
  element: BoardElement<string, { json: JSONContent; html: HTMLContent }>;
  isFocus?: boolean;
};

const Editor = React.lazy(() =>
  import('@app/components/editors/text.editor').then((r) => ({
    default: r.TextEditor,
  })),
);

export const TextItem: React.FC<Props> = ({ element, isFocus }) => {
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
      <Editor editable={isFocus} value={element.props.json} />
    </React.Suspense>
  );
};
