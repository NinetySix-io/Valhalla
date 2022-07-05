import * as React from 'react';

import { FaSolid, cProps } from '@valhalla/react';

import { SidebarItem } from './base';

type Props = cProps<{
  onChange: (isOpen: boolean) => void;
  isOpen: boolean;
}>;

export const TriggerItem: React.FC<Props> = ({ isOpen, onChange }) => {
  const [icon] = isOpen ? [FaSolid.faChevronLeft] : [FaSolid.faChevronRight];
  const text = isOpen ? 'Collapse' : 'Expand';

  return (
    <SidebarItem onClick={() => onChange(!isOpen)} icon={icon}>
      {text}
    </SidebarItem>
  );
};
