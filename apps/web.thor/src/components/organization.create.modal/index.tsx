import * as React from 'react';

import { Alert, TextField } from '@mui/material';
import {
  OrganizationPlan,
  useCreateOrganizationMutation,
} from '@app/generated/valhalla.gql';

import type { CreateOrganizationMutationVariables } from '@app/generated/valhalla.gql';
import { Form } from '@valhalla/web.react';
import { FormModal } from '../modal.form';
import type { FormModalProps } from '../modal.form';
import type { cProps } from '@valhalla/web.react';

type Payload = CreateOrganizationMutationVariables['input'];
type Props = cProps<
  {
    onFinish?: () => void;
  } & Pick<FormModalProps<Payload>, 'onClose' | 'open'>
>;

export type OrganizationCreateModalProps = Props;
export const OrganizationCreateModal: React.FC<Props> = ({
  onFinish,
  onClose,
  open,
}) => {
  const [form] = Form.useForm<Payload>();
  const [createOrg, { loading, error }] = useCreateOrganizationMutation({
    errorPolicy: 'none',
    fetchPolicy: 'no-cache',
    onCompleted: () => {
      onFinish?.();
      onClose?.();
    },
  });

  async function handleSubmit(payload: Payload) {
    await createOrg({
      variables: {
        input: {
          name: payload.name,
          plan: OrganizationPlan.FREE,
        },
      },
    });
  }

  return (
    <FormModal
      withCancel
      open={open}
      loading={loading}
      title="Create Org"
      form={form}
      onSubmit={handleSubmit}
      onClose={onClose}
    >
      <Form.Item
        name="name"
        rules={[{ required: true, message: 'Required!', min: 3 }]}
      >
        <TextField
          autoFocus
          disabled={loading}
          size="small"
          label="Organization Name"
          variant="outlined"
          autoComplete="off"
          autoCapitalize="words"
        />
      </Form.Item>
      {error && <Alert severity="error">{error.message}</Alert>}
    </FormModal>
  );
};
