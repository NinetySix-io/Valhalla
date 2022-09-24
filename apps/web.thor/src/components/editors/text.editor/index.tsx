import * as React from 'react';

import { EditorContent, useEditor } from '@tiptap/react';
import type { EditorOptions, HTMLContent, JSONContent } from '@tiptap/react';
import { css, styled } from '@mui/material';

import { BubbleMenu } from './bubble.menu';
import { EditorContext } from './context';
import StarterKit from '@tiptap/starter-kit';
import { useChangeEvent } from './hooks/use.change.event';

const Container = styled('div')(
  () => css`
    .ProseMirror {
      outline: none;
    }
  `,
);

type Props = {
  onChange?: (data: JSONContent, html: HTMLContent) => void;
  value?: JSONContent;
} & Partial<Pick<EditorOptions, 'editable' | 'autofocus'>>;

export const TextEditor: React.FC<Props> = ({ onChange, value, ...props }) => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: value,
    ...props,
  });

  useChangeEvent(editor, onChange);

  return (
    <EditorContext.Provider value={{ editor }}>
      <Container>
        <EditorContent editor={editor} />
        {editor && (
          <React.Fragment>
            <BubbleMenu />
          </React.Fragment>
        )}
      </Container>
    </EditorContext.Provider>
  );
};
