import * as React from 'react';

import { Box, TextField } from '@mui/material';
import { Form, cProps } from '@valhalla/react';

import { Modal } from '@app/components/modal';
import { useCreateSiteMutation } from '@app/generated/valhalla.gql';

type Props = cProps<{
  onClose?: () => void;
  onFinish?: () => void;
  isOpen?: boolean;
}>;

type FormPayload = {
  name: string;
};

export const CreateSiteModal: React.FC<Props> = ({
  onClose,
  onFinish,
  isOpen,
}) => {
  const [form] = Form.useForm<FormPayload>();
  const [createSite, { loading }] = useCreateSiteMutation();

  function handleClose() {
    if (loading) {
      return;
    }

    onClose?.();
    form.resetFields();
  }

  async function handleFinish(payload: FormPayload) {
    await createSite({
      variables: {
        name: payload.name,
      },
    });

    onFinish?.();
    handleClose();
  }

  return (
    <Modal
      title="Add Site"
      open={isOpen}
      loading={loading}
      onClose={handleClose}
      onSubmit={() => form.submit()}
      withCancel
      withSubmit
    >
      <Box width={400}>
        <Form form={form} onFinish={handleFinish}>
          <Form.Item
            name="name"
            rules={[{ required: true, message: 'Required!' }]}
          >
            <TextField
              autoFocus
              label="Site name"
              variant="outlined"
              autoComplete="off"
              autoCapitalize="words"
            />
          </Form.Item>
        </Form>
      </Box>
    </Modal>
  );
};
