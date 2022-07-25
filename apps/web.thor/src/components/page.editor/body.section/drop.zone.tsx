import * as React from 'react';

import { calculateSpan, selectSection } from '../selectors';
import { css, styled } from '@mui/material';

import { BUILDER_ELEMENT } from '../constants';
import { BuilderElementWithId } from '../types';
import { DropGrid } from './drop.grid';
import { DropItem } from './drop.item';
import { SiteEditorSlice } from '@app/redux/slices/editor';
import { mergeRefs } from 'react-merge-refs';
import { useDispatch } from 'react-redux';
import { useDrop } from 'react-dnd';
import { useReduxSelector } from '@app/redux/hooks';
import { useSectionId } from '../context';

const Container = styled('div')(
  () => css`
    position: relative;
    width: 100%;
    margin: auto;
    display: flex;
    flex-direction: column;
  `,
);

export const DropZone: React.FC = () => {
  const sectionId = useSectionId();
  const dispatch = useDispatch();
  const container = React.useRef<HTMLDivElement>();
  const sectionElements = useReduxSelector(selectSection(sectionId))?.children;
  const calculatePos = useReduxSelector(calculateSpan(sectionId));

  const [, drop] = useDrop<BuilderElementWithId>(
    () => ({
      accept: BUILDER_ELEMENT,
      drop(item, monitor) {
        if (!monitor.didDrop()) {
          const parent = container.current;
          const r = calculatePos(item, monitor.getClientOffset());

          if (item.id) {
            dispatch(
              SiteEditorSlice.actions.updateElementPosition({
                sectionId,
                elementId: item.id,
              }),
            );
          } else {
            dispatch(
              SiteEditorSlice.actions.addElement({
                sectionId,
                element: item,
              }),
            );
          }
        }
      },
    }),
    [],
  );

  return (
    <Container ref={mergeRefs([drop, container])}>
      <DropGrid>
        {sectionElements?.map((item) => (
          <DropItem value={item} key={item.id} />
        ))}
      </DropGrid>
    </Container>
  );
};
