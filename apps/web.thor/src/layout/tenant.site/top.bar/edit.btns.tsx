import * as React from 'react';

import { FaSolid, cProps } from '@valhalla/react';

import { IconBtn } from './icon.btn';

type Props = cProps;

export const EditButtons: React.FC<Props> = () => {
  return (
    <React.Fragment>
      <IconBtn rotation={270} icon={FaSolid.faArrowTurnUp} tip="Step Back" />
      <IconBtn
        rotation={270}
        icon={FaSolid.faArrowTurnDown}
        tip="Step Forward"
      />
    </React.Fragment>
  );
};
