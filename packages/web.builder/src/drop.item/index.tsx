import * as React from 'react';

import { css, styled } from '@mui/material';
import { focusedElementAtom, useScopeAtomMutate, useZoneId } from '../context';

import type { Direction } from 're-resizable/lib/resizer';
import type { DroppedElement } from '../types';
import type { NumberSize } from 're-resizable';
import { Resizable } from 're-resizable';
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

type Props = React.PropsWithoutRef<JSX.IntrinsicElements['div']> & {
  focusColor?: string;
  onFocusChange?: (isActive: boolean) => void;
  children?: React.ReactNode;
  element: DroppedElement;
};

export const DropItem = React.forwardRef<HTMLDivElement, Props>(
  ({ element, focusColor, children, ...props }, ref) => {
    const zoneId = useZoneId();
    const gridArea = useElementGridArea(element);
    const container = React.useRef<HTMLDivElement>();
    const setFocus = useScopeAtomMutate(focusedElementAtom);
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

    function handleResize(
      _e: MouseEvent | TouchEvent,
      _direction: Direction,
      _ref: HTMLElement,
      dimension: NumberSize,
    ) {
      // eslint-disable-next-line no-console
      console.log('handleResize', dimension);
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
      [zoneId],
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
          <Resizable
            size={{ width: '100%', height: '100%' }}
            onResize={handleResize}
          >
            {children}
          </Resizable>
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
