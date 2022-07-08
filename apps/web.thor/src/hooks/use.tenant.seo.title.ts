import { NextSeoProps } from 'next-seo';
import { useReduxSelector } from '@app/redux/hooks';

/**
 * Hook to transform seo for tenant
 */
export function useTenantSEO(SEO: NextSeoProps): NextSeoProps {
  const orgName = useReduxSelector((state) => state.tenant.organization?.name);

  return {
    ...SEO,
    titleTemplate: !orgName || !SEO?.title ? undefined : `%s | ${orgName}`,
    title: SEO?.title || orgName,
    noindex: true,
    nofollow: true,
  };
}
