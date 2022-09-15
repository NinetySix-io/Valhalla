import * as React from 'react';

import { Button, css, styled } from '@mui/material';

import { makeFilterProps } from '@valhalla/web.react';
import { useSectionId } from '../context';
import { EditorStore } from '../store';

const ActionBtn = styled(
  Button,
  makeFilterProps(['align', 'visible']),
)<{
  align?: Props['align'];
  visible?: boolean;
}>(
  ({ align, visible }) => css`
    display: ${visible ? 'initial' : 'none'};
    position: absolute;
    margin: auto;
    align-self: center;
    transition: 0.2s all;

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
    EditorStore.actions.addSection({
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
