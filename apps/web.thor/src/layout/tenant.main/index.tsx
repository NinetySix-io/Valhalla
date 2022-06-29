import { BaseLayout } from '../base';
import { Layout } from '@app/types/next';
import { NextSeo } from 'next-seo';
import React from 'react';
import { TenantStartupProvider } from '@app/components/tenant.startup.provider';
import { cProps } from '@valhalla/react';
import { useReduxSelector } from '@app/redux/hooks';

type Props = cProps;

export const TenantMainLayout: Layout<Props> = ({ children, SEO }) => {
  const orgName = useReduxSelector((state) => state.tenant.organization?.name);
  const titleTemplate = orgName ? `%s | ${orgName}` : undefined;

  return (
    <React.Fragment>
      <NextSeo titleTemplate={titleTemplate} {...SEO} noindex nofollow />
      <TenantStartupProvider>
        <BaseLayout>{children}</BaseLayout>
      </TenantStartupProvider>
    </React.Fragment>
  );
};
