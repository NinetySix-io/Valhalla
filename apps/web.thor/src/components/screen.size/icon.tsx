import * as React from 'react';

import { FaSolid, Icon } from '@valhalla/react';

import { ScreenSize } from '@app/redux/slices/editor';

const IconMap = {
  [ScreenSize.DESKTOP]: FaSolid.faDesktop,
  [ScreenSize.TABLET]: FaSolid.faTabletScreenButton,
  [ScreenSize.MOBILE]: FaSolid.faMobileScreenButton,
};

type Props = { value: ScreenSize } & Omit<
  React.ComponentProps<typeof Icon>,
  'icon'
>;

export const ScreenSizeIcon: React.FC<Props> = ({ value }) => {
  return <Icon icon={IconMap[value]} />;
};
