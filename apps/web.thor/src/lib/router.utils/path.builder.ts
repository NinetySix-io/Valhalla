import { PageSchema, SiteSchema } from '@app/generated/valhalla.gql';

export function makePageEditorPath(props: {
  siteId: SiteSchema['id'];
  pageId: PageSchema['id'];
}) {
  return `/sites/${props.siteId}/pages/${props.pageId}/editor`;
}

export function makeSitePath(siteId: SiteSchema['id']) {
  return `/sites/${siteId}`;
}
