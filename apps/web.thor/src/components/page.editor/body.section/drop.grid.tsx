import * as React from 'react';

import { XYCoord, useDragDropManager } from 'react-dnd';
import { css, styled } from '@mui/material';
import { selectSection, selectSizeConfig } from '../selectors';

import { Drop } from '@valhalla/web.builder';
import { SiteEditorSlice } from '@app/redux/slices/editor';
import { useDispatch } from 'react-redux';
import { useReduxSelector } from '@app/redux/hooks';
import { useSectionId } from '../context';

const Container = styled(Drop.Grid)(() => css``);

type Props = {
  children?: React.ReactNode;
};

export const DropGrid: React.FC<Props> = ({ children }) => {
  const sectionId = useSectionId();
  const dispatch = useDispatch();
  const [, setClientOffset] = React.useState<XYCoord>();
  const [isOver, setIsOver] = React.useState(false);
  const size = useReduxSelector(selectSizeConfig());
  const section = useReduxSelector(selectSection(sectionId));
  const container = React.useRef<HTMLDivElement & { cellSize: number }>(null);
  const monitor = useDragDropManager().getMonitor();

  const handleOffsetChange = React.useCallback(() => {
    if (!container.current) {
      return;
    }

    const nextOffset = monitor.getSourceClientOffset();
    const containerBound = container.current.getBoundingClientRect();
    const containerYAxisStart = containerBound.y;
    const containerYAxisEnd = containerYAxisStart + containerBound.height;

    setClientOffset(nextOffset);
    if (nextOffset) {
      setIsOver(
        containerYAxisStart <= nextOffset.y &&
          containerYAxisEnd >= nextOffset.y,
      );
    } else {
      setIsOver(false);
    }
  }, [monitor, setIsOver, setClientOffset]);

  function handleCellSize(cellSize: number) {
    dispatch(SiteEditorSlice.actions.setCellSize(cellSize));
  }

  React.useEffect(() => {
    const unsubscribe = monitor.subscribeToOffsetChange(handleOffsetChange);
    return () => {
      unsubscribe();
    };
  }, [monitor, handleOffsetChange]);

  return (
    <Container
      showGrid={isOver}
      ref={container}
      rowsCount={section?.config.rowsCount}
      columnsCount={size.columns}
      onCellSize={handleCellSize}
    >
      {children}
    </Container>
  );
};
