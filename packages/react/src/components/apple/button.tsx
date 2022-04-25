import * as React from 'react';

import { Button, ButtonProps } from '@mui/material';

import { FaApple } from 'react-icons/fa';

type Props = Omit<ButtonProps, 'startIcon'>;

export const AppleButton: React.FC<Props> = (props) => {
  return <Button variant="outlined" {...props} startIcon={<FaApple />} />;
};
