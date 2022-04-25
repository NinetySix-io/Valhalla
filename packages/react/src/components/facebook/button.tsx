import * as React from 'react';

import { Button, ButtonProps } from '@mui/material';

import { FaFacebook } from 'react-icons/fa';

type Props = Omit<ButtonProps, 'startIcon'>;

export const FacebookButton: React.FC<Props> = (props) => {
  return <Button variant="outlined" {...props} startIcon={<FaFacebook />} />;
};
