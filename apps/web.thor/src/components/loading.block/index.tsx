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
  return (isReady ? children : spinner) as React.ReactElement;
};
