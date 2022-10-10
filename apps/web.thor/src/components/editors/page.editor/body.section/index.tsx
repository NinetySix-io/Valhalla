import * as React from 'react';

import { Container, MenuArea } from './styles';
import {
  PrimitiveElementType,
  useAddTextElementMutation,
  useDeleteManyElementsMutation,
} from '@app/generated/valhalla.gql';
import {
  useGetElementsByGroupQuery,
  useUpdatePageSectionFormatMutation,
} from '@app/generated/valhalla.gql';

import { AddSectionBtn } from './add.section.btn';
import { EditorStore } from '../store';
import { ElementFactory } from './element.factory';
import { ElementsBoard } from './elements.board';
import { ElementsMenu } from './elements.menu';
import { Outline } from './outline';
import type { PageElement } from '../types';
import type { PageSectionSchema } from '@app/generated/valhalla.gql';
import { ScreenSize } from '../constants';
import { SectionMenu } from './section.menu';
import { SectionProvider } from './scope.provider';
import { tryNice } from 'try-nice';
import { useSitePageId } from '@app/hooks/hydrate/use.site.page.hydrate';

type Props = {
  index: number;
  section: Pick<PageSectionSchema, 'id' | 'format'>;
};

export const BodySection: React.FC<Props> = React.memo(({ section, index }) => {
  const pageId = useSitePageId();
  const [updateFormat] = useUpdatePageSectionFormatMutation();
  const [deleteElements] = useDeleteManyElementsMutation();
  const [addTextElement] = useAddTextElementMutation();
  const sectionElements = useGetElementsByGroupQuery({
    fetchPolicy: 'no-cache',
    variables: {
      groupId: section.id,
    },
  });

  const isMobile = EditorStore.useSelect(
    (state) => state.size < ScreenSize.DESKTOP,
  );

  async function handleAddElement(element: PageElement) {
    await tryNice(() => {
      if (element.type === PrimitiveElementType.TEXT) {
        addTextElement({
          variables: {
            groupId: section.id,
            input: {
              desktop: element.desktop,
              mobile: element.mobile,
              tablet: element.tablet,
              html: element.html,
              json: element.json,
            },
          },
        });
      }
    });

    sectionElements.refetch();
  }

  async function handleDeleteElements(elementIdList: PageElement['id'][]) {
    await deleteElements({ variables: { elementIdList } });
    await sectionElements.refetch();
  }

  function handleHover() {
    if (EditorStore.getState().activeSection !== section.id) {
      EditorStore.actions.setActiveSection(section.id);
    }
  }

  function handleLeave() {
    if (EditorStore.getState().activeSection) {
      EditorStore.actions.setActiveSection(null);
    }
  }

  return (
    <SectionProvider
      sectionId={section.id}
      config={section.format}
      index={index}
    >
      <Container onMouseEnter={handleHover} onMouseLeave={handleLeave}>
        <ElementsBoard.DndContext>
          <MenuArea isMobile={isMobile}>
            <ElementsMenu placement="left" />
            <SectionMenu placement="right" />
          </MenuArea>
          <ElementsBoard
            onConfigChange={(format) =>
              updateFormat({
                variables: {
                  pageId,
                  sectionId: section.id,
                  input: {
                    columnGap: format.columnGap,
                    rowGap: format.rowGap,
                    rowsCount: format.rowsCount,
                  },
                },
              })
            }
            // onElementsUpdated={handleElementsUpdated}
            onElementsDeleted={handleDeleteElements}
            onElementAdded={handleAddElement}
          >
            {sectionElements.data?.pageElementListByGroup.map((element) => {
              return (
                <ElementsBoard.Item key={element.id} element={element}>
                  <ElementFactory element={element} />
                </ElementsBoard.Item>
              );
            })}
          </ElementsBoard>
          <Outline />
          <AddSectionBtn align="top" />
          <AddSectionBtn align="bottom" />
        </ElementsBoard.DndContext>
      </Container>
    </SectionProvider>
  );
});

BodySection.displayName = 'BodySection';
