import * as React from 'react';

type Props = {
  children?: React.ReactNode;
  isReady?: boolean;
  spinner?: React.ReactNode;
};

export const LoadingBlock: React.FC<Props> = ({
  children,
  isReady = true,
  spinner = 'Loading ...',
}) => {
  if (!isReady) {
    return <React.Fragment>{spinner}</React.Fragment>;
  }

  return <React.Fragment>{children}</React.Fragment>;
};
