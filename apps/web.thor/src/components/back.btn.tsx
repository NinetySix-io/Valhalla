import * as React from 'react';

import { Button, ButtonProps } from '@mui/material';

import { FaArrowLeft } from 'react-icons/fa';
import { cProps } from '@valhalla/react';
import { useRouterBack } from '@app/lib/router.utils';

type Props = cProps<Omit<ButtonProps, 'onClick'> & { withFiller?: boolean }>;

export const BackButton: React.FC<Props> = ({
  withFiller,
  children,
  ...props
}) => {
  const { canGoBack, goBack } = useRouterBack();

  if (!canGoBack && !withFiller) {
    return null;
  } else if (!canGoBack) {
    return <i />;
  }

  return (
    <Button
      startIcon={<FaArrowLeft />}
      variant="text"
      size="small"
      {...props}
      onClick={() => goBack()}
    >
      {children || 'Back'}
    </Button>
  );
};
