import * as React from 'react';

import { Alert, Box, TextField } from '@mui/material';
import {
  CreateOrganizationMutationVariables,
  OrganizationPlan,
  useCreateOrganizationMutation,
} from '@app/graphql/valhalla/generated.gql';
import { Form, cProps } from '@valhalla/react';

import { Modal } from '../modal';

type Props = cProps<
  Omit<
    React.ComponentProps<typeof Modal>,
    'children' | 'title' | 'withCancel' | 'withSubmit' | 'onSubmit'
  > & {
    onFinish?: () => void;
  }
>;

type Payload = CreateOrganizationMutationVariables;

export const OrganizationCreateModal: React.FC<Props> = ({
  onFinish,
  onClose,
  ...props
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
        name: payload.name,
        plan: OrganizationPlan.FREE,
      },
    });
  }

  return (
    <Modal
      {...props}
      withCancel
      withSubmit
      title="Create Org"
      onSubmit={() => form.submit()}
      onClose={onClose}
    >
      <Box width={400}>
        <Form<Payload> form={form} onFinish={handleSubmit}>
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
        </Form>
        {error && <Alert severity="error">{error.message}</Alert>}
      </Box>
    </Modal>
  );
};
