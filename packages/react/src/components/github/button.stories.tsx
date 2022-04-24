import * as React from 'react';

import { ComponentMeta } from '@storybook/react';
import { GithubButton } from './index';

type ComponentType = typeof GithubButton;
const Meta: ComponentMeta<ComponentType> = {
  title: 'Components/Github/Button',
  component: GithubButton,
};

const Template = (props) => <GithubButton {...props} />;

export const Login = Template.bind({});
export const Register = Template.bind({});

Login.args = {
  children: 'Login With Github',
};

Register.args = {
  children: 'Join with Github',
};

export default Meta;
