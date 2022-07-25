import * as React from 'react';

import { Button, Container } from '@mui/material';

import { ComponentMeta } from '@storybook/react';
import { Form } from '../form';
import { UsernameFormItem } from './index';

type ComponentType = typeof UsernameFormItem;

const Meta: ComponentMeta<ComponentType> = {
  title: 'Components/Form Items/Username',
  component: UsernameFormItem,
};

export const Primary: React.FC = () => {
  const [form] = Form.useForm();

  return (
    <Container maxWidth="sm">
      <Form form={form}>
        <UsernameFormItem autoFocus />
        <Form.Item>
          <Button variant="contained" onClick={() => form.submit()}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Container>
  );
};

export default Meta;
