import * as React from 'react';

import { Editor } from '@tiptap/react';

export const EditorContext = React.createContext({
  editor: null as Editor,
});

export function useEditor() {
  return React.useContext(EditorContext).editor;
}