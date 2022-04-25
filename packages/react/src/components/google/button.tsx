import * as React from 'react';

import { Button, ButtonProps } from '@mui/material';

import { FcGoogle } from 'react-icons/fc';

type Props = Omit<ButtonProps, 'startIcon'>;

export const GoogleButton: React.FC<Props> = (props) => {
  return <Button variant="outlined" {...props} startIcon={<FcGoogle />} />;
};
