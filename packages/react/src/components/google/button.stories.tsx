import * as React from 'react';

import { ComponentMeta } from '@storybook/react';
import { GoogleButton } from './index';

type ComponentType = typeof GoogleButton;
const Meta: ComponentMeta<ComponentType> = {
  title: 'Components/Google/Button',
  component: GoogleButton,
};

const Template = (props) => <GoogleButton {...props} />;

export const Login = Template.bind({});
export const Register = Template.bind({});

Login.args = {
  children: 'Login with Google',
};

Register.args = {
  children: 'Join with Google',
};

export default Meta;
