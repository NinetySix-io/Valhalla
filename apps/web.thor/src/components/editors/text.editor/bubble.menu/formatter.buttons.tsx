import * as React from 'react';

import { Button, css, styled } from '@mui/material';

import { makeFilterProps } from '@valhalla/web.react';
import { useEditor } from '../context';

const Container = styled('div')(
  () => css`
    display: flex;
    flex-direction: row;
  `,
);

const ActionButton = styled(
  Button,
  makeFilterProps(['isActive']),
)<{ isActive: boolean }>(
  ({ theme, isActive }) => css`
    color: ${isActive ? theme.palette.action.active : theme.palette.grey[500]};
    min-width: 40px;
  `,
);

export const FormatterButtons: React.FC = () => {
  const editor = useEditor();

  return (
    <Container>
      <ActionButton
        size="small"
        isActive={editor.isActive('bold')}
        onClick={() => editor.chain().focus().toggleBold().run()}
      >
        B
      </ActionButton>
      <ActionButton
        size="small"
        isActive={editor.isActive('italic')}
        onClick={() => editor.chain().focus().toggleItalic().run()}
      >
        I
      </ActionButton>
      <ActionButton
        size="small"
        isActive={editor.isActive('strike')}
        onClick={() => editor.chain().focus().toggleStrike().run()}
      >
        S
      </ActionButton>
    </Container>
  );
};
