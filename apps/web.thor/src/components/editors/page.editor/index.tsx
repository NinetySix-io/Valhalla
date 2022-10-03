import * as React from 'react';

import { css, styled } from '@mui/material';

import { BodySection } from './body.section';
import { EditorStore } from './store';
import { EmptyContent } from './empty';
import { ScreenSize } from './constants';
import isEmpty from 'lodash.isempty';
import { makeFilterProps } from '@valhalla/web.react';

const Container = styled(
  'div',
  makeFilterProps(['size']),
)<{ size: ScreenSize }>(
  ({ theme, size }) => css`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    flex-grow: 1;
    overflow: auto;
    transition: all 0.5s;
    align-self: center;

    ${size === ScreenSize.DESKTOP &&
    css`
      width: 100%;
      height: 100%;
    `}

    ${size < ScreenSize.DESKTOP &&
    css`
      max-width: ${size}px;
      outline: solid thin ${theme.palette.grey[200]};
      border-radius: ${theme.shape.borderRadius};
      margin: ${theme.spacing(1)} 0;
    `}

      ${size === ScreenSize.MOBILE &&
    css`
      min-height: 844px;
    `}

      ${size === ScreenSize.TABLET &&
    css`
      min-height: 1180px;
    `};
  `,
);

export const PageEditor: React.FC = () => {
  const size = EditorStore.useSelect((state) => state.size);
  const sections = EditorStore.useSelect((state) => state.sections);

  if (isEmpty(sections)) {
    return (
      <Container size={size}>
        <EmptyContent />
      </Container>
    );
  }

  return (
    <Container size={size}>
      {sections.map((section) => (
        <BodySection key={section.id} sectionId={section.id} />
      ))}
    </Container>
  );
};
