import * as React from 'react';

import { Button, css, styled } from '@mui/material';
import { EditorStore, makeSection } from '../store';

import { makeFilterProps } from '@valhalla/web.react';
import { useSectionId } from './scope.provider';

const ActionBtn = styled(
  Button,
  makeFilterProps(['align', 'visible']),
)<{
  align?: Props['align'];
  visible?: boolean;
}>(
  ({ align, visible }) => css`
    position: absolute;
    margin: auto;
    align-self: center;
    transition: 0.2s all;

    &:hover {
      transform: scale(1.2);
    }

    ${!visible &&
    css`
      opacity: 0;
    `}

    ${align === 'top' &&
    css`
      top: 0;
      margin-top: -15px;
    `}

    ${align === 'bottom' &&
    css`
      bottom: 0;
      margin-bottom: -15px;
    `}
  `,
);

type Props = {
  isVisible: boolean;
  align: 'top' | 'bottom';
};

export const AddSectionBtn: React.FC<Props> = ({ align, isVisible }) => {
  const sectionId = useSectionId();

  function handleClick() {
    EditorStore.actions.addSection(makeSection(), {
      anchorSection: sectionId,
      isBefore: align === 'top',
    });
  }

  return (
    <ActionBtn
      size="small"
      variant="contained"
      visible={isVisible}
      align={align}
      onClick={handleClick}
    >
      Add Section
    </ActionBtn>
  );
};
