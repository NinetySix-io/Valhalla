import * as React from 'react';

import { EditorContent, useEditor } from '@tiptap/react';
import type { EditorOptions, HTMLContent, JSONContent } from '@tiptap/react';
import { css, styled } from '@mui/material';

import { BubbleMenu } from './menus/menu.bubble';
import { EditorContext } from './context';
import Highlight from '@tiptap/extension-highlight';
import { NewLineMenu } from './menus/menu.new.line';
import StarterKit from '@tiptap/starter-kit';
import Typography from '@tiptap/extension-typography';
import { useChangeEvent } from './hooks/use.change.event';

const Container = styled('div')(
  () => css`
    width: 100%;
    height: 100%;
  `,
);

type Props = {
  onChange?: (data: JSONContent, html: HTMLContent) => void;
  value?: JSONContent;
} & Partial<Pick<EditorOptions, 'editable' | 'autofocus'>>;

export const TextEditor: React.FC<Props> = ({
  onChange,
  value,
  editable,
  ...props
}) => {
  const editor = useEditor({
    extensions: [StarterKit, Typography, Highlight],
    content: value,
    editable,
    ...props,
  });

  React.useEffect(() => {
    editor?.setEditable(editable);
  }, [editable, editor]);

  useChangeEvent(editor, onChange);

  return (
    <EditorContext.Provider value={{ editor }}>
      <Container>
        <EditorContent editor={editor} />
        {editor && (
          <React.Fragment>
            <BubbleMenu />
            <NewLineMenu />
          </React.Fragment>
        )}
      </Container>
    </EditorContext.Provider>
  );
};
