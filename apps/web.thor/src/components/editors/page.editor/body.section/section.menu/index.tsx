import * as React from 'react';

import { Button, Divider, Popover, Stack, css, styled } from '@mui/material';
import { useSectionId, useSectionIndex } from '../scope.provider';

import { EditorMenu } from '../../menu';
import { EditorStore } from '../../store';
import { SectionMenuContent } from './content';
import { useHelperDisplay } from '../hooks/use.helpers.display';

const ActionBtn = styled(Button)(
  ({ theme }) => css`
    padding: 5px ${theme.spacing(1)};
    font-size: ${theme.typography.caption.fontSize};
  `,
);

type Props = Pick<
  React.ComponentProps<typeof EditorMenu>,
  'style' | 'placement'
>;

export const SectionMenu: React.FC<Props> = (props) => {
  const anchor = React.useRef<HTMLDivElement>();
  const sectionIndex = useSectionIndex();
  const sectionId = useSectionId();
  const [menuVisible, setMenuVisible] = React.useState(false);
  const sectionsCount = EditorStore.useSelect((state) => state.sections.length);
  const isVisible = useHelperDisplay();

  function handleDelete() {
    EditorStore.actions.deleteSection(sectionId);
  }

  function moveUp() {
    EditorStore.actions.moveSectionUp(sectionId);
  }

  function moveDown() {
    EditorStore.actions.moveSectionDown(sectionId);
  }

  function handleCopy() {
    alert('TODO');
  }

  function openMenu() {
    setMenuVisible(true);
  }

  function closeMenu() {
    setMenuVisible(false);
  }

  return (
    <EditorMenu {...props} isVisible={isVisible} ref={anchor}>
      <Stack spacing={1}>
        <Button size="small" onClick={openMenu}>
          Edit Section
        </Button>
        <Divider />
        <Stack direction="row" spacing={0.5}>
          <ActionBtn
            disabled={sectionIndex === sectionsCount - 1}
            onClick={moveDown}
          >
            Down
          </ActionBtn>
          <ActionBtn disabled={sectionIndex === 0} onClick={moveUp}>
            Up
          </ActionBtn>
          <ActionBtn color="warning" onClick={handleCopy}>
            Copy
          </ActionBtn>
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
