import { NextSeoProps } from 'next-seo';
import { useOrgCtx } from './hydrate/use.org.hydrate';

/**
 * Hook to transform seo for tenant
 */
export function useTenantSEO(SEO: NextSeoProps): NextSeoProps {
  const organization = useOrgCtx().name;

  return {
    ...SEO,
    titleTemplate:
      !organization || !SEO?.title ? undefined : `%s | ${organization}`,
    title: SEO?.title || organization,
    noindex: true,
    nofollow: true,
  };
}
