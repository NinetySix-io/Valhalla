import * as React from 'react';

import { EditorContent, useEditor } from '@tiptap/react';
import type { EditorOptions, HTMLContent, JSONContent } from '@tiptap/react';
import { css, styled } from '@mui/material';

import { BubbleMenu } from './menus/menu.bubble';
import { EditorContext } from './context';
import Highlight from '@tiptap/extension-highlight';
import { NewLineMenu } from './menus/menu.new.line';
import Placeholder from '@tiptap/extension-placeholder';
import StarterKit from '@tiptap/starter-kit';
import Typography from '@tiptap/extension-typography';
import { useEditorSubscription } from './hooks/use.editor.subscription';

const Container = styled('div')(
  ({ theme }) => css`
    .ProseMirror p.is-editor-empty:first-child::before {
      color: ${theme.palette.grey[400]};
      content: attr(data-placeholder);
      float: left;
      height: 0;
      pointer-events: none;
    }
  `,
);

type Props = {
  value?: JSONContent;
  onEditStart?: () => void;
  onEditEnd?: () => void;
  onChange?: (data: {
    json: JSONContent;
    html: HTMLContent;
    height: number;
  }) => void;
} & Partial<Pick<EditorOptions, 'editable' | 'autofocus'>>;

export const TextEditor: React.FC<Props> = ({
  onChange,
  onEditEnd,
  onEditStart,
  value,
  editable,
  ...props
}) => {
  const container = React.useRef<HTMLDivElement>();
  const editor = useEditor({
    extensions: [
      StarterKit,
      Typography,
      Highlight,
      Placeholder.configure({
        placeholder: 'Write here',
        showOnlyWhenEditable: false,
      }),
    ],
    content: value,
    editable,
    onFocus: () => {
      onEditStart?.();
    },
    onBlur: () => {
      onEditEnd?.();
    },
    ...props,
  });

  useEditorSubscription(editor, 'focus', onEditStart);
  useEditorSubscription(editor, 'blur', onEditEnd);
  useEditorSubscription(editor, 'update', (context) => {
    if (context.transaction.steps.length > 0) {
      onChange?.({
        json: context.editor.getJSON(),
        html: context.editor.getHTML(),
        height: container.current.clientHeight,
      });
    }
  });

  React.useEffect(() => {
    editor?.setEditable(editable);
  }, [editable, editor]);

  return (
    <EditorContext.Provider value={{ editor }}>
      <Container ref={container}>
        <EditorContent editor={editor} />
        <BubbleMenu />
        <NewLineMenu isDisabled />
      </Container>
    </EditorContext.Provider>
  );
};
