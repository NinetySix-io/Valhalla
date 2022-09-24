import type { SectionState } from '.';
import { createSelectorFactory } from '@app/lib/create.selector';

export const createSectionSelector = createSelectorFactory<SectionState>();
