import type { GetStaticPaths } from 'next';

export function makeTenantStaticPaths(): GetStaticPaths {
  return () => ({
    paths: [],
    fallback: 'blocking',
  });
}
