import * as React from 'react';

import { Button, Divider, Popover, Stack, css, styled } from '@mui/material';

import { EditorMenu } from '../../menu';
import { SectionMenuContent } from './content';
import { SiteEditorSlice } from '@app/redux/slices/editor';
import { useDispatch } from 'react-redux';
import { useSectionId } from '../../context';

const ActionBtn = styled(Button)(
  ({ theme }) => css`
    padding: 5px ${theme.spacing(1)};
    font-size: ${theme.typography.caption.fontSize};
  `,
);

type Props = {
  isVisible: boolean;
} & Pick<React.ComponentProps<typeof EditorMenu>, 'style' | 'placement'>;

export const SectionMenu: React.FC<Props> = ({ isVisible, ...props }) => {
  const dispatch = useDispatch();
  const anchor = React.useRef<HTMLDivElement>();
  const sectionId = useSectionId();
  const [menuVisible, setMenuVisible] = React.useState(false);

  function handleDelete() {
    dispatch(SiteEditorSlice.actions.deleteSection(sectionId));
  }

  function moveUp() {
    dispatch(SiteEditorSlice.actions.moveSectionUp(sectionId));
  }

  function moveDown() {
    dispatch(SiteEditorSlice.actions.moveSectionDown(sectionId));
  }

  function openMenu() {
    setMenuVisible(true);
  }

  function closeMenu() {
    setMenuVisible(false);
  }

  return (
    <EditorMenu {...props} open={isVisible} containerRef={anchor}>
      <Stack spacing={1}>
        <Button size="small" onClick={openMenu}>
          Edit Section
        </Button>
        <Divider />
        <Stack direction="row" spacing={0.5}>
          <ActionBtn onClick={moveDown}>Down</ActionBtn>
          <ActionBtn onClick={moveUp}>Up</ActionBtn>
          <ActionBtn>Copy</ActionBtn>
          <ActionBtn color="error" onClick={handleDelete}>
            Delete
          </ActionBtn>
        </Stack>
      </Stack>
      <Popover
        elevation={2}
        open={menuVisible}
        keepMounted={false}
        anchorEl={anchor.current}
        onClose={closeMenu}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <SectionMenuContent />
      </Popover>
    </EditorMenu>
  );
};
