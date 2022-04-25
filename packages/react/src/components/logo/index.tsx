import * as React from 'react';

import Image from 'next/image';
import { cProps } from '../../types';

type Props = cProps<
  Omit<React.ComponentProps<typeof Image>, 'src'> & {
    variant?: 'black' | 'white';
  }
>;

export const LOGO_WHITE_URL =
  'https://res.cloudinary.com/ninetysix-io/image/upload/v1650833488/NinetySix/logo.white_kxcz7e.png';
export const LOGO_BLACK_URL =
  'https://res.cloudinary.com/ninetysix-io/image/upload/v1650833488/NinetySix/logo.black_txzx7f.png';

export const Logo: React.FC<Props> = ({ variant = 'black', ...props }) => {
  return (
    <Image
      alt="Logo"
      width="100%"
      height="100%"
      {...props}
      src={variant === 'black' ? LOGO_BLACK_URL : LOGO_WHITE_URL}
    />
  );
};
