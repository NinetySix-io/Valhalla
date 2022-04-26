import { BasicObject } from '@valhalla/utilities';
import * as React from 'react';

export type Page<T extends BasicObject = BasicObject> = React.FC<T> & {
  Layout?: React.FC<{
    children: React.ReactNode;
  }>;
};
