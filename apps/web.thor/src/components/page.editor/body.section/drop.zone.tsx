import * as React from 'react';

import { SectionDrop, SiteEditorSlice } from '@app/redux/slices/editor';
import { css, styled } from '@mui/material';

import { DropItem } from './drop.item';
import { ELEMENT } from '../constants';
import { makeFilter } from '@app/lib/make.filter';
import { useDispatch } from 'react-redux';
import { useDrop } from 'react-dnd';
import { useReduxSelector } from '@app/redux/hooks';
import { useSectionId } from '../context';

const Container = styled('div')(
  ({ theme }) => css`
    min-height: 200px;
    padding: ${theme.spacing(7)} 0;
    width: 100%;
    margin: auto;
    display: flex;
    flex-direction: column;
  `,
);

const DropGrid = styled('div', {
  shouldForwardProp: makeFilter(['isVisible']),
})<{ isVisible: boolean }>(
  ({ theme, isVisible }) => css`
    position: absolute;
    left: 0;
    right: 0;
    width: 100%;
    height: 100%;
    z-index: -1;

    ${isVisible
      ? css`
          background-color: ${theme.palette.grey[100]};
        `
      : css`
          background-color: transparent;
        `}
  `,
);

export const DropZone: React.FC = () => {
  const sectionId = useSectionId();
  const dispatch = useDispatch();
  const drops = useReduxSelector(
    (state) =>
      state.SiteEditor.sections.find((section) => section.id === sectionId)
        .children,
  );

  const [{ isOver }, drop] = useDrop(
    () => ({
      accept: ELEMENT,
      drop(item: SectionDrop, monitor) {
        if (!monitor.didDrop()) {
          if (item.id) {
            dispatch(
              SiteEditorSlice.actions.updateDropPosition({
                sectionId,
                dropId: item.id,
                delta: monitor.getDifferenceFromInitialOffset(),
              }),
            );
          } else {
            dispatch(
              SiteEditorSlice.actions.addDrop({
                sectionId,
                type: item.type,
                delta: monitor.getSourceClientOffset(),
              }),
            );
          }
        }
      },
      collect(monitor) {
        return {
          isOver: monitor.isOver({
            shallow: true,
          }),
        };
      },
    }),
    [],
  );

  return (
    <Container ref={drop}>
      <DropGrid isVisible={isOver} />
      {drops?.map((item) => (
        <DropItem value={item} key={item.id} />
      ))}
    </Container>
  );
};
