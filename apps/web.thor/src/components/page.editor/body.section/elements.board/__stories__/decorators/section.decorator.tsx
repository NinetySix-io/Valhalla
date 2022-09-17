import * as React from 'react';

import type { DecoratorFn } from '@storybook/react';
import { EditorStore } from '@app/components/page.editor/store';
import { SectionProvider } from '../../../scope.provider';

export const SectionDecorator: DecoratorFn = (Story) => {
  const section = React.useMemo(() => {
    const first = EditorStore.getState().sections[0];
    if (first) {
      EditorStore.actions.deleteSection(first.id);
    }

    EditorStore.actions.addSection();
    const section = EditorStore.getState().sections[0];
    EditorStore.actions.addElement(section.id, {
      id: 'item1',
      type: 'Text',
      x: 4,
      y: 5,
      xSpan: 3,
      ySpan: 1,
    });

    EditorStore.actions.addElement(section.id, {
      id: 'item2',
      type: 'Text',
      x: 0,
      y: 0,
      xSpan: 3,
      ySpan: 3,
    });

    return section;
  }, []);

  return (
    <SectionProvider sectionId={section.id} config={section.config}>
      <Story />
    </SectionProvider>
  );
};
