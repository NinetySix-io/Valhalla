import * as React from 'react';

import { Button, ButtonProps } from '@mui/material';
import { FaBrand, Icon } from '../icons';

type Props = Omit<ButtonProps, 'startIcon'>;

export const GithubButton: React.FC<Props> = (props) => {
  return (
    <Button
      variant="outlined"
      {...props}
      startIcon={<Icon icon={FaBrand.faGithub} />}
    />
  );
};
