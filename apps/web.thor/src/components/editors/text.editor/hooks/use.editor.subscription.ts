import * as React from 'react';

import type { Editor, EditorEvents } from '@tiptap/react';

/**
 * It subscribes to an event on an editor and unsubscribes when the component unmounts
 */
export function useEditorSubscription<
  E extends keyof EditorEvents,
  C extends EditorEvents[E],
>(editor: Editor, event: E, onTrigger?: (context: C) => void) {
  React.useEffect(() => {
    function handle(context: C) {
      onTrigger?.(context);
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    editor?.on(event, handle as any);

    return () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      editor?.off(event, handle as any);
    };
  }, [onTrigger, event, editor]);
}
