import {
  GetPageSectionListDocument,
  useGetPageSectionListQuery,
} from '@app/generated/valhalla.gql';

import { useApolloClient } from '@apollo/client';
import { useSitePageId } from '@app/hooks/hydrate/use.site.page.hydrate';

/**
 * It returns a query object that contains a list of sections for a given page
 */
export function useSectionsList() {
  const pageId = useSitePageId();
  return useGetPageSectionListQuery({
    variables: {
      pageId,
    },
  });
}

/**
 * It returns a function that will refetch the query that fetches the list of sections
 */
export function useSectionListInvalidate() {
  const apollo = useApolloClient();
  return () =>
    apollo.refetchQueries({
      include: [GetPageSectionListDocument],
    });
}
