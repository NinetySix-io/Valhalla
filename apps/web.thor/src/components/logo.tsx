import * as React from 'react';

import { Logo as NinetySixLogo, cProps } from '@valhalla/react';

import { useReduxSelector } from '@app/redux/hooks';

type Props = cProps<
  Omit<React.ComponentProps<typeof NinetySixLogo>, 'variant'>
>;

export const Logo: React.FC<Props> = (props) => {
  const isDarkMode = useReduxSelector((state) => state.meta.isDarkMode);

  return <NinetySixLogo {...props} variant={isDarkMode ? 'white' : 'black'} />;
};
