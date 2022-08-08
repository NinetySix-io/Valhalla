import * as React from 'react';

import type { DroppedElement, Size } from '../types';
import {
  cellSizeAtom,
  focusedElementAtom,
  gridVisibleAtom,
  useScopeAtomMutate,
  useScopeAtomValue,
  useZoneId,
} from '../context';
import { css, styled } from '@mui/material';

import { DIRECTION } from './directions';
import { Resizer } from './resizer';
import { calculateResize } from '../lib/calculate.resize';
import { makeFilterProps } from '@valhalla/web.react';
import { mergeRefs } from 'react-merge-refs';
import { useDrag } from 'react-dnd';
import { useElementGridArea } from '../hooks/use.element';

const Container = styled(
  'div',
  makeFilterProps(['label', 'gridArea', 'isFocus']),
)<{ label: string; gridArea: string; isFocus: boolean }>(
  ({ theme, color, label, gridArea, isFocus }) => {
    const mainColor: string = color ?? theme.palette.primary.main;
    const textColor: string = theme.palette.getContrastText(mainColor);

    if (!gridArea) {
      return css`
        display: none;
      `;
    }

    return css`
      position: relative;
      border: solid 3px transparent;
      margin-right: calc(-1 * (var(--pt-w) + 0.5 * var(--pt-w)));
      margin-bottom: calc(-1 * (var(--pt-w) + 0.5 * var(--pt-w)));
      transition: all 0.2s;
      grid-area: ${gridArea};
      z-index: auto;

      ${isFocus
        ? css`
            border-color: ${mainColor};

            &:hover {
              cursor: auto;
            }
          `
        : css`
            &:hover {
              cursor: grab;
              border-color: ${mainColor};

              /* LABEL */
              &:before {
                content: '${label}';
                top: -20px;
                left: -3px;
                height: 18px;
                overflow: hidden;
                height: max-content;
                font-size: ${theme.typography.caption.fontSize};
                padding: 2px ${theme.spacing(1)};
                background-color: ${mainColor};
                border-top-left-radius: 3px;
                border-top-right-radius: 3px;
                font-family: ${theme.typography.fontFamily};
                position: absolute;
                color: ${textColor};
                display: flex;
                flex-direction: column;
                justify-content: center;
              }
            }
          `}
    `;
  },
);

type Props = Omit<
  React.PropsWithoutRef<JSX.IntrinsicElements['div']>,
  'onChange'
> & {
  focusColor?: string;
  onFocusChange?: (isActive: boolean) => void;
  children?: React.ReactNode;
  element: DroppedElement;
  onChange?: (element: DroppedElement) => void;
};

export const DropItem = React.forwardRef<HTMLDivElement, Props>(
  ({ element, focusColor, children, onChange, ...props }, ref) => {
    const container = React.useRef<HTMLDivElement>();
    const zoneId = useZoneId();
    const gridArea = useElementGridArea(element);
    const cellSize = useScopeAtomValue(cellSizeAtom);
    const setFocus = useScopeAtomMutate(focusedElementAtom);
    const setGridVisible = useScopeAtomMutate(gridVisibleAtom);
    const [isFocus, setIsFocus] = React.useState(false);

    function handleLoseFocus() {
      setFocus(null);
      setIsFocus(false);
    }

    function handleFocus() {
      if (!isFocus) {
        setIsFocus(true);
        setFocus(element.id);
      }
    }

    function handleResize(direction: DIRECTION, nextSize: Size) {
      onChange?.(
        calculateResize({
          cellSize,
          direction,
          element,
          nextSize,
        }),
      );
    }

    const [{ isDragging }, drag] = useDrag(
      {
        type: zoneId,
        item: element,
        end() {
          handleFocus();
        },
        collect(monitor) {
          return {
            isDragging: monitor.isDragging(),
          };
        },
      },
      [zoneId, element],
    );

    if (isDragging) {
      return <div ref={drag} />;
    } else if (isFocus) {
      return (
        <Container
          {...props}
          tabIndex={0}
          color={focusColor}
          ref={mergeRefs([ref, container])}
          onMouseUp={handleFocus}
          onBlur={handleLoseFocus}
          label={element.type.toUpperCase()}
          gridArea={gridArea}
          isFocus={isFocus}
        >
          <Resizer
            minWidth={cellSize}
            minHeight={cellSize}
            onResize={handleResize}
            onResizeStart={() => setGridVisible(true)}
            onResizeFinish={() => setGridVisible(false)}
          >
            {children}
          </Resizer>
        </Container>
      );
    }

    return (
      <Container
        {...props}
        tabIndex={0}
        color={focusColor}
        ref={mergeRefs([ref, drag, container])}
        onMouseUp={handleFocus}
        onBlur={handleLoseFocus}
        label={element.type.toUpperCase()}
        gridArea={gridArea}
        isFocus={isFocus}
      >
        {children}
      </Container>
    );
  },
);

DropItem.displayName = 'DropItem';
