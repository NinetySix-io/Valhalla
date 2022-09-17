import { Form } from '@valhalla/web.react';
import { FormContainer } from './index';
import { TextField } from '@mui/material';
import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';

storiesOf('Components/Form/Container', module).add('Default', () => {
  return (
    <FormContainer title="Username">
      <Form onFinish={action('Submit')}>
        <Form.Item name="First Name">
          <TextField label="First Name" />
        </Form.Item>
        <Form.Item name="Last Name">
          <TextField label="Last Name" />
        </Form.Item>
      </Form>
    </FormContainer>
  );
});
