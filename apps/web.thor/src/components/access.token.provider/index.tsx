import * as React from 'react';

import { cProps } from '@valhalla/react';
import { useAccessTokenSync } from '@app/lib/access.token';

type Props = cProps;

export const AccessTokenProvider: React.FC<Props> = ({ children }) => {
  useAccessTokenSync();
  return children as React.ReactElement;
};
