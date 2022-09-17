import * as React from 'react';

import { Button, Typography } from '@mui/material';
import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { Modal } from './index';
import { styled } from '@mui/material';

type ComponentType = typeof Modal;
type Props = Pick<
  React.ComponentProps<ComponentType>,
  | 'title'
  | 'withCancel'
  | 'withCloseBtn'
  | 'withSubmit'
  | 'loading'
  | 'allowBackdropClose'
>;

const Content = styled('div')`
  width: 400px;
  height: 400px;
`;

const Template: ComponentStory<ComponentType> = (props: Props) => {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <div>
      <Button variant="contained" size="large" onClick={() => setIsOpen(true)}>
        Open Modal
      </Button>
      <Modal open={isOpen} onClose={() => setIsOpen(false)} {...props}>
        <Content>
          <Typography>Content</Typography>
        </Content>
      </Modal>
    </div>
  );
};

const Meta: ComponentMeta<ComponentType> = {
  title: 'Components/Modal',
  component: Template,
};

export const Default = Template.bind({});
Default.args = {
  title: 'My Modal',
  withCancel: false,
  withSubmit: false,
  withCloseBtn: false,
  loading: false,
  allowBackdropClose: true,
};

export default Meta;
