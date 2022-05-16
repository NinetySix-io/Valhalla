import { ServTenants, ServUsers } from '@valhalla/entities';

import { Metadata } from '@grpc/grpc-js';

/**
 * TODO: fix type
 * @param meta
 * @returns
 */
export function getIdentityFromCtx(meta: Metadata) {
  const gMap = meta.getMap();
  const tempUser = gMap.user;
  const tempInApp = gMap.inapp;
  const tempTenantInfo = gMap['x-tenant-info'];
  const tempTenant = gMap?.tenant;

  let user: ServUsers.User | null = null;
  let tenant: ServTenants.Tenant | null = null;
  let tenantInfo: unknown = null;
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
