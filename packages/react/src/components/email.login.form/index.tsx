import * as React from 'react';

import { Form } from '../form';
import { LoadingButton } from '@mui/lab';
import { TextField } from '@mui/material';
import { cProps } from '../../types';

type Payload = {
  email: string;
  password: string;
};

type Props = cProps<{
  onFinish: (payload: Payload) => void;
  loading?: boolean;
}>;

export const EmailLoginForm: React.FC<Props> = ({
  onFinish,
  loading,
  ...props
}) => {
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
          label="Email Address"
          disabled={loading}
          variant="outlined"
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
          disabled={loading}
          label="Password"
          variant="outlined"
          placeholder="Password"
          type="password"
          autoComplete="current-password"
          autoCapitalize="off"
        />
      </Form.Item>
      <Form.Item>
        <LoadingButton
          loading={loading}
          variant="contained"
          onClick={() => form.submit()}
          loadingPosition="start"
        >
          Submit
        </LoadingButton>
      </Form.Item>
    </Form>
  );
};
