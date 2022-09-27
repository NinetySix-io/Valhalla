import * as React from 'react';

import { ActionButton, MenuContainer } from '../style';

import { BubbleMenu as TTBubbleMenu } from '@tiptap/react';
import { useEditor } from '../../context';

type Props = {
  isDisabled?: boolean;
};

//TODO: Icons
export const BubbleMenu: React.FC<Props> = ({ isDisabled }) => {
  const editor = useEditor();
  if (!editor || isDisabled) {
    return null;
  }

  return (
    <TTBubbleMenu editor={editor} tippyOptions={{ duration: 100 }}>
      <MenuContainer>
        <ActionButton
          isActive={editor.isActive('bold')}
          onClick={() => editor.chain().focus().toggleBold().run()}
        >
          B
        </ActionButton>
        <ActionButton
          isActive={editor.isActive('italic')}
          onClick={() => editor.chain().focus().toggleItalic().run()}
        >
          I
        </ActionButton>
        <ActionButton
          isActive={editor.isActive('strike')}
          onClick={() => editor.chain().focus().toggleStrike().run()}
        >
          S
        </ActionButton>
      </MenuContainer>
    </TTBubbleMenu>
  );
};
