import * as React from 'react';

import type {
  Editor,
  EditorEvents,
  HTMLContent,
  JSONContent,
} from '@tiptap/react';

export function useChangeEvent(
  editor: Editor,
  onChange: (data: JSONContent, html: HTMLContent) => void,
) {
  React.useEffect(() => {
    const handler = (context: EditorEvents['update']) => {
      onChange(context.editor.getJSON(), context.editor.getHTML());
    };

    editor?.on('update', handler);

    return () => {
      editor?.off('update', handler);
    };
  }, [editor, onChange]);
}
