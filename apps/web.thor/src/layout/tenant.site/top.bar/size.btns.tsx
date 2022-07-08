import * as React from 'react';

import { FaSolid, cProps } from '@valhalla/react';

import { IconBtn } from './icon.btn';
import { IconButton } from '@mui/material';

type Props = cProps & Pick<React.ComponentProps<typeof IconButton>, 'size'>;

export const SizeButtons: React.FC<Props> = ({ size = 'small' }) => {
  return (
    <React.Fragment>
      <IconBtn size={size} icon={FaSolid.faDesktop} tip="Desktop Display" />
      <IconBtn
        size={size}
        icon={FaSolid.faTabletScreenButton}
        tip="Tablet Display"
      />
      <IconBtn
        size={size}
        icon={FaSolid.faMobileScreenButton}
        tip="Mobile Display"
      />
    </React.Fragment>
  );
};
