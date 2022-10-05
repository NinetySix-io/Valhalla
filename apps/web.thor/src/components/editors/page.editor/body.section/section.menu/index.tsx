import * as React from 'react';

import { Button, Divider, Popover, Stack, css, styled } from '@mui/material';
import {
  useCloneSection,
  useDeleteSection,
  useMoveSection,
} from '../../hooks/use.section.mutations';
import { useSectionId, useSectionIndex } from '../scope.provider';

import { EditorMenu } from '../../menu';
import { SectionMenuContent } from './content';
import size from 'lodash.size';
import { useHelperDisplay } from '../hooks/use.helpers.display';
import { useSectionsList } from '../../hooks/use.sections.list';

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
  const sectionList = useSectionsList();
  const [menuVisible, setMenuVisible] = React.useState(false);
  const isLast = sectionIndex === size(sectionList.data?.sectionList) - 1;
  const isFirst = sectionIndex === 0;
  const isVisible = useHelperDisplay();
  const [deleteSection, deleting] = useDeleteSection(sectionId);
  const [moveSection, moving] = useMoveSection(sectionId, sectionIndex);
  const [cloneSection, cloning] = useCloneSection(sectionId);

  function handleDelete() {
    deleteSection();
  }

  function moveUp() {
    moveSection('up');
  }

  function moveDown() {
    moveSection('down');
  }

  function handleCopy() {
    cloneSection();
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
          <ActionBtn disabled={isLast || moving} onClick={moveDown}>
            Down
          </ActionBtn>
          <ActionBtn disabled={isFirst || moving} onClick={moveUp}>
            Up
          </ActionBtn>
          <ActionBtn disabled={cloning} color="warning" onClick={handleCopy}>
            Copy
          </ActionBtn>
          <ActionBtn disabled={deleting} color="error" onClick={handleDelete}>
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
