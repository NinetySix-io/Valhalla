import { ButtonBuilderElement, TextBuilderElement } from './types';

import { ScreenSize } from '@app/redux/slices/editor';

export const BUILDER_ELEMENT = 'BUILDER_ELEMENT' as const;

export const SCREEN_SIZE_CONFIG = {
  [ScreenSize.DESKTOP]: {
    columns: 24,
  },
  [ScreenSize.TABLET]: {
    columns: 16,
  },
  [ScreenSize.MOBILE]: {
    columns: 8,
  },
} as const;

export const TEXT_ELEMENT: TextBuilderElement = {
  type: 'Text',
  width: 20,
  height: 10,
};

export const BUTTON_ELEMENT: ButtonBuilderElement = {
  type: 'Button',
  width: 10,
  height: 5,
};
