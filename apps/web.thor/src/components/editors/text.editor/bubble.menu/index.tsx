import * as React from 'react';

import { css, styled } from '@mui/material';

import { FormatterButtons } from './formatter.buttons';
import { BubbleMenu as TTBubbleMenu } from '@tiptap/react';
import { useEditor } from '../context';

const Menu = styled(TTBubbleMenu)(
  ({ theme }) => css`
    background-color: ${theme.palette.background.paper};
    border-radius: ${theme.shape.borderRadius};
    box-shadow: ${theme.shadows[2]};
    padding: 3px;
  `,
);

export const BubbleMenu: React.FC = () => {
  const editor = useEditor();

  return (
    <Menu editor={editor} tippyOptions={{ duration: 100 }}>
      <FormatterButtons />
    </Menu>
  );
};
