import dynamic from 'next/dynamic';

export const DynamicOrganizationCreateModal = dynamic(() =>
  import('./index').then((r) => r.OrganizationCreateModal),
);
