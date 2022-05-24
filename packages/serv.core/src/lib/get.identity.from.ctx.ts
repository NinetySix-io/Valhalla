/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * @param meta
 * @returns
 */
export function getIdentityFromCtx(meta: any) {
  const gMap = meta.getMap();
  const tempUser = gMap.user;
  const tempInApp = gMap.inapp;
  const tempTenantInfo = gMap['x-tenant-info'];
  const tempTenant = gMap?.tenant;

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

  if (tempTenant && typeof tempTenant === 'string') {
    tenant = JSON.parse(tempTenant);
  }

  if (tempTenantInfo && typeof tempTenantInfo === 'string') {
    tenantInfo = JSON.parse(tempTenantInfo);
  }

  return {
    user,
    tenant,
    tenantInfo,
    inApp,
  };
}
