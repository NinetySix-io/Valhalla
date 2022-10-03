import * as React from 'react';

import { css, styled } from '@mui/material';
import { makeFilterProps, useEvent } from '@valhalla/web.react';

import isNil from 'lodash.isnil';
import { useSectionStore } from '../../scope.provider';

const Container = styled(
  'div',
  makeFilterProps(['height']),
)<{ height: number }>(
  ({ theme, height }) => css`
    display: flex;
    flex-direction: row;
    align-items: flex-end;
    justify-content: flex-start;
    font-size: ${theme.typography.caption.fontSize};
    position: absolute;
    top: ${-(height + 3)}px;
    left: -3px;
    padding-bottom: 3px;
    overflow: hidden;

    ${!height &&
    css`
      opacity: 0;
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
  const store = useSectionStore();
  const isDragging = store.useSelect((state) => !isNil(state.dragging));
  const container = React.useRef<HTMLDivElement>();
  const [height, setHeight] = React.useState(0);
  const [isHover, setIsHover] = React.useState(false);
  const shouldShow = isHover && isVisible && !isDragging;

  useEvent(parent, 'mouseover', () => setIsHover(() => true));
  useEvent(parent, 'mouseout', () => setIsHover(() => false));

  React.useEffect(() => {
    if (container.current && shouldShow && !height) {
      setHeight(container.current.clientHeight);
    }
  }, [shouldShow, height, container]);

  if (!shouldShow) {
    return null;
  }

  return (
    <Container
      ref={container}
      height={height}
      onMouseOver={() => setIsHover(() => true)}
      onMouseOut={() => setIsHover(() => false)}
    >
      <LabelTag>{label.toUpperCase()}</LabelTag>
    </Container>
  );
};
