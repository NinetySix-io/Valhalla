import * as React from 'react';

import { Form, cProps } from '@valhalla/web.react';

import { FormModal } from '../modal.form';
import { TextField } from '@mui/material';
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
    <FormModal
      title="Add Site"
      open={isOpen}
      loading={loading}
      onClose={handleClose}
      onSubmit={form.submit}
      onFinish={handleFinish}
      withCancel
    >
      <Form.Item name="name" rules={[{ required: true, message: 'Required!' }]}>
        <TextField
          autoFocus
          label="Site name"
          variant="outlined"
          autoComplete="off"
          autoCapitalize="words"
        />
      </Form.Item>
    </FormModal>
  );
};
