import * as React from 'react';

import { css, styled } from '@mui/material';
import { makeFilterProps, useEvent } from '@valhalla/web.react';

const Container = styled(
  'div',
  makeFilterProps(['isVisible']),
)<{ isVisible: boolean }>(
  ({ theme, isVisible }) => css`
    display: flex;
    flex-direction: row;
    align-items: flex-end;
    justify-content: flex-start;
    font-size: ${theme.typography.caption.fontSize};
    position: absolute;
    top: -23px;
    left: -3px;
    padding-bottom: 3px;
    overflow: hidden;

    ${!isVisible &&
    css`
      display: none;
    `}
  `,
);

const LabelTag = styled('div')(
  ({ theme }) => css`
    background-color: ${theme.palette.primary.main};
    color: ${theme.palette.primary.contrastText};
    padding: 2px ${theme.spacing(1)};
    margin-right: ${theme.spacing(1)};
  `,
);

type Props = {
  label: string;
  parent: HTMLDivElement;
  isVisible: boolean;
};

export const ElementsBoardItemMenu: React.FC<Props> = ({
  label,
  parent,
  isVisible,
}) => {
  const [isHover, setIsHover] = React.useState(false);

  useEvent(parent, 'mouseover', () => setIsHover(() => true));
  useEvent(parent, 'mouseout', () => setIsHover(() => false));

  return (
    <Container
      isVisible={isHover && isVisible}
      onMouseOver={() => setIsHover(() => true)}
      onMouseOut={() => setIsHover(() => false)}
    >
      <LabelTag>{label.toUpperCase()}</LabelTag>
    </Container>
  );
};
