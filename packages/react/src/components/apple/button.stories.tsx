import * as React from 'react';

import { AppleButton } from './index';
import { ComponentMeta } from '@storybook/react';

type ComponentType = typeof AppleButton;
type Props = React.ComponentProps<ComponentType>;

const Meta: ComponentMeta<ComponentType> = {
  title: 'Components/Apple/Button',
  component: AppleButton,
};

const Template = (props: Props) => <AppleButton {...props} />;

export const Login = Template.bind({});
export const Register = Template.bind({});

Login.args = {
  children: 'Login with Apple',
} as Props;

Register.args = {
  children: 'Join with Apple',
} as Props;

export default Meta;
