import * as React from 'react';

import Image from 'next/image';
import LogoAsset from '../../assets/logo.png';
import { cProps } from '../../types';

type Props = cProps<Omit<React.ComponentProps<typeof Image>, 'src'>>;

export const Logo: React.FC<Props> = (props) => {
  return <Image alt="Logo" {...props} src={LogoAsset} />;
};
