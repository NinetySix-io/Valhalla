import * as React from 'react';

import type { ComponentMeta, Story } from '@storybook/react';

import { TextEditor } from '../index';
import { makeParagraphJson } from '@app/storybook/tools/editor/make.text.json';

type ComponentType = typeof TextEditor;
type Props = React.ComponentProps<ComponentType>;

const Meta: ComponentMeta<ComponentType> = {
  title: 'NinetySix/Editors/Text Editor',
  component: TextEditor,
};

const Template: Story<Props> = (props) => {
  return <TextEditor {...props} />;
};

export const Default = Template.bind({});
const args: Props = {
  editable: true,
  value: makeParagraphJson(),
};

Default.args = args;

export default Meta;
