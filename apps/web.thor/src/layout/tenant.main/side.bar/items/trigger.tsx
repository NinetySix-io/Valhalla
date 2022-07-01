import * as React from 'react';

import { FaSolid, Icon, cProps } from '@valhalla/react';
import { ListItemButton, ListItemIcon } from '@mui/material';

type Props = cProps<{
  onChange: (isOpen: boolean) => void;
  isOpen: boolean;
}>;

export const TriggerItem: React.FC<Props> = ({ isOpen, onChange }) => {
  const [icon] = isOpen ? [FaSolid.faChevronLeft] : [FaSolid.faChevronRight];

  return (
    <ListItemButton onClick={() => onChange(!isOpen)}>
      <ListItemIcon>
        <Icon icon={icon} />
      </ListItemIcon>
    </ListItemButton>
  );
};
