import * as React from 'react';

import { ComponentMeta } from '@storybook/react';
import { FacebookButton } from './index';

type ComponentType = typeof FacebookButton;
type Props = React.ComponentProps<ComponentType>;

const Meta: ComponentMeta<ComponentType> = {
  title: 'Components/Facebook/Button',
  component: FacebookButton,
};

const Template = (props: Props) => <FacebookButton {...props} />;

export const Login = Template.bind({});
export const Register = Template.bind({});

Login.args = {
  children: 'Login with Facebook',
} as Props;

Register.args = {
  children: 'Join with Facebook',
} as Props;

export default Meta;
