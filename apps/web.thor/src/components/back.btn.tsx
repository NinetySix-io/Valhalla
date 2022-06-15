import * as React from 'react';

import { Button, ButtonProps } from '@mui/material';
import { FaSolid, Icon, cProps } from '@valhalla/react';

import Link from 'next/link';
import { useRouterBack } from '@app/lib/router.utils';

type Props = cProps<Omit<ButtonProps, 'onClick'> & { withFiller?: boolean }>;

export const BackButton: React.FC<Props> = ({
  withFiller,
  children,
  ...props
}) => {
  const { canGoBack, returnToLink } = useRouterBack();

  if (!canGoBack && !withFiller) {
    return null;
  } else if (!canGoBack) {
    return <i />;
  }

  return (
    <Link href={returnToLink} passHref>
      <Button
        startIcon={<Icon icon={FaSolid.faArrowLeft} />}
        variant="text"
        size="small"
        {...props}
      >
        {children || 'Back'}
      </Button>
    </Link>
  );
};
