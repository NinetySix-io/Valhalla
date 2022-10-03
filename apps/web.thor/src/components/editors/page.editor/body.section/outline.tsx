import * as React from 'react';

import { css, styled } from '@mui/material';

import { EditorStore } from '../store';
import { useSectionId } from './scope.provider';

const Container = styled('div')<{ isVisible: boolean }>(
  ({ theme, isVisible }) => css`
    --size: 2px;
    position: absolute;
    left: var(--size);
    top: calc(var(--size) * 2);
    right: var(--size);
    bottom: var(--size);
    z-index: -1;
    outline: solid var(--size) ${theme.palette.grey[200]};
    opacity: ${isVisible ? 1 : 0};
    transition: ${theme.transitions.create('opacity', {
      duration: theme.transitions.duration.standard,
    })};
  `,
);

export const Outline: React.FC = () => {
  const sectionId = useSectionId();
  const isVisible = EditorStore.useSelect(
    (state) => state.activeSection === sectionId,
  );

  return <Container isVisible={isVisible || true} />;
};
