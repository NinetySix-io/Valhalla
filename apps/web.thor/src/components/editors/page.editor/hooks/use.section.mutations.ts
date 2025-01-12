import type { PageSection } from '@app/generated/valhalla.gql';
import { useClonePageSectionMutation } from '@app/generated/valhalla.gql';
import { useCreatePageSectionMutation } from '@app/generated/valhalla.gql';
import { useDeletePageSectionMutation } from '@app/generated/valhalla.gql';
import { useSectionListInvalidate } from './use.sections.list';
import { useSitePageId } from '@app/hooks/hydrate/use.site.page.hydrate';
import { useUpdatePageSectionIndexMutation } from '@app/generated/valhalla.gql';

export function useAddSection(sectionIndex?: number) {
  const pageId = useSitePageId();
  const invalidateSections = useSectionListInvalidate();
  const [addSection, { loading }] = useCreatePageSectionMutation({
    onCompleted() {
      invalidateSections();
    },
  });

  function handleAdd(placement?: 'before' | 'after') {
    addSection({
      variables: {
        pageId,
        input: {
          index: placement
            ? placement === 'after'
              ? sectionIndex + 1
              : sectionIndex
            : null,
        },
      },
    });
  }

  return [handleAdd, loading] as const;
}

export function useDeleteSection(sectionId: PageSection['id']) {
  const pageId = useSitePageId();
  const invalidateSections = useSectionListInvalidate();
  const [deleteSection, { loading }] = useDeletePageSectionMutation({
    variables: {
      pageId,
      sectionId,
    },
    onCompleted() {
      invalidateSections();
    },
  });

  return [deleteSection, loading] as const;
}

export function useMoveSection(
  sectionId: PageSection['id'],
  sectionIndex: number,
) {
  const pageId = useSitePageId();
  const invalidateSections = useSectionListInvalidate();
  const [updateSectionIndex, { loading }] = useUpdatePageSectionIndexMutation({
    onCompleted() {
      invalidateSections();
    },
  });

  function moveSection(direction?: 'up' | 'down') {
    updateSectionIndex({
      variables: {
        pageId,
        sectionId,
        index: direction === 'up' ? sectionIndex - 1 : sectionIndex + 1,
      },
    });
  }

  return [moveSection, loading] as const;
}

export function useCloneSection(sectionId: PageSection['id']) {
  const pageId = useSitePageId();
  const invalidateSections = useSectionListInvalidate();
  const [clone, { loading }] = useClonePageSectionMutation({
    variables: { sectionId, pageId },
    onCompleted() {
      invalidateSections();
    },
  });

  return [clone, loading] as const;
}
