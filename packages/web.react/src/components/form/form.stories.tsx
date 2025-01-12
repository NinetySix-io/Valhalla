import * as React from 'react';

import { Button, Grid, TextField, Typography } from '@mui/material';

import type { ComponentMeta } from '@storybook/react';
import { Form } from './index';
import { action } from '@storybook/addon-actions';

type ComponentType = typeof Form;

const Meta: ComponentMeta<ComponentType> = {
  title: 'Components/Form',
  component: Form,
};

export const SampleForm: React.FC = () => {
  const [form] = Form.useForm();

  const handleSubmit = (payload: unknown) => {
    action('Submit')(payload);
  };

  return (
    <Grid container spacing={1} direction="column" maxWidth="sm">
      <Grid item>
        <Typography variant="h4">Sample Form</Typography>
      </Grid>
      <Grid item>
        <Form form={form} onFinish={handleSubmit}>
          <Form.Item
            name="input"
            rules={[{ required: true, message: 'Required' }]}
          >
            <TextField variant="outlined" placeholder="Sample Input" />
          </Form.Item>
        </Form>
      </Grid>
      <Grid item>
        <Button variant="contained" onClick={() => form.submit()}>
          Submit
        </Button>
      </Grid>
    </Grid>
  );
};

export default Meta;
