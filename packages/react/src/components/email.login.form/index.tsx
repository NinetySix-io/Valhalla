import * as React from 'react';

import { Button, TextField } from '@mui/material';

import { Form } from '../form';
import { cProps } from '../../types';

type Payload = {
  email: string;
  password: string;
};

type Props = cProps<{
  onFinish: (payload: Payload) => void;
}>;

export const EmailLoginForm: React.FC<Props> = ({ onFinish, ...props }) => {
  const [form] = Form.useForm();

  const handleSubmit = (payload: Payload) => {
    onFinish(payload);
  };

  return (
    <Form {...props} form={form} onFinish={handleSubmit}>
      <Form.Item
        name="email"
        rules={[
          { required: true, message: 'Required' },
          { type: 'email', message: 'Invalid email format' },
        ]}
      >
        <TextField
          required
          variant="outlined"
          placeholder="Email Address"
          type="email"
          autoComplete="email"
          autoCapitalize="off"
        />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: 'Required' }]}
      >
        <TextField
          required
          variant="outlined"
          placeholder="Password"
          type="password"
          autoComplete="current-password"
          autoCapitalize="off"
        />
      </Form.Item>
      <Form.Item>
        <Button variant="contained" onClick={() => form.submit()}>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};
