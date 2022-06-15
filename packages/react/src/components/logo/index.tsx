import * as React from 'react';

import Image from 'next/image';
import { cProps } from '../../types';

type Props = cProps<
  Omit<React.ComponentProps<typeof Image>, 'src'> & {
    variant?: 'black' | 'white';
  }
>;

export const LOGO_WHITE_URL =
  'https://res.cloudinary.com/ninetysix-io/image/upload/v1655344119/NinetySix/white_logo_q5wkvn.png';
export const LOGO_BLACK_URL =
  'https://res.cloudinary.com/ninetysix-io/image/upload/v1655344117/NinetySix/black_logo_nolhv5.png';

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
