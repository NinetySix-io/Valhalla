/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * @param meta
 * @returns
 */
export function getIdentityFromCtx(meta: any) {
  const gMap = meta.getMap();
  const tempUser = gMap.user;
  const tempInApp = gMap.inapp;
  const tempOrgInfo = gMap['x-tenant-info'];
  const tempOrg = gMap?.tenant;

  let user: any | null = null; //TODO
  let tenant: any | null = null; //TODO
  let tenantInfo: { tenantId: string } | null = null;
  let inApp = false;

  if (tempUser && typeof tempUser === 'string') {
    user = JSON.parse(tempUser);
  }

  if (tempInApp && typeof tempInApp === 'string') {
    inApp = Boolean(inApp);
  }

  if (tempOrg && typeof tempOrg === 'string') {
    tenant = JSON.parse(tempOrg);
  }

  if (tempOrgInfo && typeof tempOrgInfo === 'string') {
    tenantInfo = JSON.parse(tempOrgInfo);
  }

  return {
    user,
    tenant,
    tenantInfo,
    inApp,
  };
}
