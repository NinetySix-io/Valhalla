import { Button, TextField } from '@mui/material';
import * as React from 'react';
import { addDecorator, storiesOf } from '@storybook/react';
import { FormModal } from './index';
import { Form } from '@valhalla/web.react';
import { action } from '@storybook/addon-actions';
import { withPerformance } from 'storybook-addon-performance';

addDecorator(withPerformance);

storiesOf('Components/Modal Form', module)
  .addParameters({ layout: 'centered' })
  .add('Default', () => {
    const [form] = Form.useForm();
    const [isOpen, setIsOpen] = React.useState(false);

    function toggleOpen() {
      setIsOpen((value) => !value);
    }

    function handleClose() {
      toggleOpen();
      action('onClose')();
    }

    async function handleSubmit(payload: unknown) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      form.resetFields();
      action('Submit')(payload);
    }

    return (
      <div>
        <Button onClick={toggleOpen} variant="contained">
          Open Modal
        </Button>
        <FormModal
          closeOnSuccess
          open={isOpen}
          form={form}
          title="My Form"
          onSubmit={handleSubmit}
          onClose={handleClose}
        >
          <Form.Item
            name="firstName"
            rules={[{ required: true, message: 'Required!' }]}
          >
            <TextField label="First Name" />
          </Form.Item>
          <Form.Item
            name="lastName"
            rules={[{ required: true, message: 'Required!' }]}
          >
            <TextField label="last Name" />
          </Form.Item>
        </FormModal>
      </div>
    );
  });
