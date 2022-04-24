import * as React from 'react';

import { Button, ButtonProps } from '@mui/material';

import { FaGithub } from 'react-icons/fa';

type Props = Omit<ButtonProps, 'startIcon'>;

export const GithubButton: React.FC<Props> = (props) => {
  return <Button variant="outlined" {...props} startIcon={<FaGithub />} />;
};
