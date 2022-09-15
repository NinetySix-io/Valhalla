import * as React from 'react';

import type { cProps } from '@valhalla/web.react';
import { Logo as NinetySixLogo } from '@valhalla/web.react';

import { MetaStore } from '@app/global.store/meta';

type Props = cProps<
  Omit<React.ComponentProps<typeof NinetySixLogo>, 'variant'>
>;

export const Logo: React.FC<Props> = (props) => {
  const isDarkMode = MetaStore.useSelect((state) => state.isDarkMode);

  return <NinetySixLogo {...props} variant={isDarkMode ? 'white' : 'black'} />;
};
