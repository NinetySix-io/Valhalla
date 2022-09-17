import { DndDecorator } from './decorators/dnd.decorator';
import { EditorStore } from '@app/components/page.editor/store';
import { ElementFactory } from '../../element.factory';
import { ElementsBoard } from '../index';
import { SectionDecorator } from './decorators/section.decorator';
import { action } from '@storybook/addon-actions';
import { compareById } from '@app/lib/compare.by.id';
import { storiesOf } from '@storybook/react';
import { useSectionId } from '../../scope.provider';

storiesOf('NinetySix/Page Editor', module)
  .addDecorator(DndDecorator)
  .addDecorator(SectionDecorator)
  .add('Board', () => {
    const sectionId = useSectionId();
    const elements = EditorStore.useSelect(
      (state) => state.sections.find(compareById(sectionId))?.children,
    );

    return (
      <ElementsBoard
        onConfigChange={(nextConfig) => {
          EditorStore.actions.updateSectionConfig(sectionId, nextConfig);
          action('onConfigChange')(nextConfig);
        }}
        onElementsUpdated={(elements) => {
          EditorStore.actions.replaceElements(sectionId, elements);
          action('onElementsUpdated')(elements);
        }}
        onElementsDeleted={(elementIdList) => {
          EditorStore.actions.removeElements(sectionId, elementIdList);
          action('onElementsDeleted')(elementIdList);
        }}
      >
        {elements?.map((element) => (
          <ElementsBoard.Item key={element.id} element={element}>
            <ElementFactory element={element} />
          </ElementsBoard.Item>
        ))}
      </ElementsBoard>
    );
  });
