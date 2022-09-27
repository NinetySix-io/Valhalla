import * as React from 'react';

import { ActionButton, MenuContainer } from '../style';

import { FloatingMenu } from '@tiptap/react';
import { useEditor } from '../../context';

type Props = {
  isDisabled?: boolean;
};

export const NewLineMenu: React.FC<Props> = ({ isDisabled }) => {
  const editor = useEditor();
  const levels = [1, 2, 3, 4, 5, 6] as const;

  if (!editor || isDisabled) {
    return null;
  }

  return (
    <FloatingMenu editor={editor} tippyOptions={{ duration: 100 }}>
      <MenuContainer>
        {levels.map((level) => (
          <ActionButton
            key={`heading-level-${level}`}
            isActive={editor.isActive('heading', { level })}
            onClick={() =>
              editor.chain().focus().toggleHeading({ level }).run()
            }
          >
            H{level}
          </ActionButton>
        ))}
        <ActionButton
          isActive={editor.isActive('bulletList')}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
        >
          List
        </ActionButton>
      </MenuContainer>
    </FloatingMenu>
  );
};
