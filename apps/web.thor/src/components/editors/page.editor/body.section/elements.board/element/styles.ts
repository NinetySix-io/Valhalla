import { css, styled } from '@mui/material';

import { Resizer } from './resizer';
import type { XYCoord } from '../../../types';
import { makeFilterProps } from '@valhalla/web.react';

export const Container = styled(
  Resizer,
  makeFilterProps([
    'transform',
    'gridArea',
    'isFocus',
    'isDragging',
    'isMultiSelected',
    'transformShadow',
    'shouldPeak',
    'isEditingText',
  ]),
)<{
  transform?: XYCoord;
  gridArea: string;
  isFocus: boolean;
  isDragging: boolean;
  isMultiSelected: boolean;
  transformShadow: boolean;
  shouldPeak: boolean;
  isEditingText: boolean;
}>(
  ({
    theme,
    gridArea,
    isFocus,
    isDragging,
    isMultiSelected,
    transform,
    transformShadow,
    shouldPeak,
    isEditingText,
  }) => {
    if (!gridArea) {
      return css`
        display: none;
      `;
    }

    return css`
      position: relative;
      outline: solid 3px transparent;
      grid-area: ${gridArea};
      z-index: auto;
      transition: ${theme.transitions.create(['margin', 'padding'], {
        duration: 200,
      })};

      ${transform &&
      css`
        transform: translate(${transform.x}px, ${transform.y}px);

        > * {
          opacity: 0.5;
        }

        ${transformShadow &&
        css`
          box-shadow: ${theme.shadows[10]};
        `}
      `}

      ${isMultiSelected &&
      css`
        outline: none;
      `}

      ${shouldPeak &&
      !isMultiSelected &&
      css`
        outline-color: #ccc;
      `}

      ${isFocus
        ? !isDragging &&
          css`
            outline-color: ${theme.palette.primary.main};

            ${isEditingText &&
            css`
              padding: ${theme.spacing(1)};
              margin: ${theme.spacing(-1)};
            `}
          `
        : !isDragging &&
          css`
            &:hover {
              outline-color: ${theme.palette.primary.main};
            }
          `}
    `;
  },
);
