import type { Page, Site } from '@app/generated/valhalla.gql';

export function makePageEditorPath(props: {
  siteId: Site['id'];
  pageId: Page['id'];
}) {
  return `/sites/${props.siteId}/pages/${props.pageId}/editor`;
}

export function makeSitePath(siteId: Site['id']) {
  return `/sites/${siteId}`;
}
