import { cProps } from '@valhalla/react';

type Props = cProps;

export const Layout: React.FC<Props> = ({ children }) => {
  return <div>{children}</div>;
};
