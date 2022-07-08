import type { OrganizationCreateModalProps } from './index';
import dynamic from 'next/dynamic';

export const DynamicOrganizationCreateModal =
  dynamic<OrganizationCreateModalProps>(
    () => import('./index').then((r) => r.OrganizationCreateModal),
    {
      ssr: false,
      loading: () => null,
    },
  );
