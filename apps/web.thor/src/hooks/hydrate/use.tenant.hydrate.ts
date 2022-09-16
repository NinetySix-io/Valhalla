import { Tenant } from '@app/global.store/tenant';
import { ORG_CONTEXT_KEY } from '@app/next/plugins/presets/with.org.context';

/**
 * If the pageProps object has a property called ORG_CONTEXT_KEY, then set the Tenant state to the
 * value of that property.
 */
export function useTenantHydrate(pageProps: Record<string, unknown>) {
  if (pageProps[ORG_CONTEXT_KEY]) {
    Tenant.setState({
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      organization: pageProps[ORG_CONTEXT_KEY] as any,
    });
  }
}
