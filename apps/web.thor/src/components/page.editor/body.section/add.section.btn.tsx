import * as React from 'react';

import { Button, css, styled } from '@mui/material';
import { useIsSectionActive, useSectionId } from './context';

import { SiteEditorSlice } from '@app/redux/slices/editor';
import { cProps } from '@valhalla/react';
import { makeFilter } from '@app/lib/make.filter';
import { useDispatch } from 'react-redux';

const ActionBtn = styled(Button, {
  shouldForwardProp: makeFilter(['align', 'visible']),
})<{ align?: Props['align']; visible?: boolean }>(
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

type Props = cProps<{
  align: 'top' | 'bottom';
}>;

export const AddSectionBtn: React.FC<Props> = ({ align }) => {
  const sectionId = useSectionId();
  const dispatch = useDispatch();
  const visible = useIsSectionActive();

  function handleClick() {
    dispatch(
      SiteEditorSlice.actions.addSection({
        anchorSection: sectionId,
        isBefore: align === 'top',
      }),
    );
  }

  return (
    <ActionBtn
      size="small"
      variant="contained"
      visible={visible}
      align={align}
      onClick={handleClick}
    >
      Add Section
    </ActionBtn>
  );
};
