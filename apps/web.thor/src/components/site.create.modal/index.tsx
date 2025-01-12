import * as React from 'react';

import { Form } from '@valhalla/web.react';
import { FormModal } from '../modal.form';
import { TextField } from '@mui/material';
import type { cProps } from '@valhalla/web.react';
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

  async function handleSubmit(payload: FormPayload) {
    await createSite({
      variables: {
        input: {
          name: payload.name,
        },
      },
    });

    onFinish?.();
    handleClose();
  }

  return (
    <FormModal
      title="Add Site"
      open={isOpen}
      form={form}
      loading={loading}
      onClose={handleClose}
      onSubmit={handleSubmit}
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
