import * as React from 'react';

import { BaseLayout } from '../base';
import { Footer } from './footer';
import { Header } from './header';
import { cProps } from '@valhalla/web.react';

type Props = cProps;

export const MainLayout: React.FC<Props> = ({ children }) => {
  return (
    <BaseLayout>
      <Header />
      {children}
      <Footer />
    </BaseLayout>
  );
};
