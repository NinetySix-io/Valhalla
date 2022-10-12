import * as React from 'react';

import { Form } from '@valhalla/web.react';
import { FormModal } from '@app/components/modal.form';
import type { Page } from '@app/generated/valhalla.gql';
import { TextField } from '@mui/material';
import type { cProps } from '@valhalla/web.react';
import { useSitePageHydrate } from '@app/hooks/hydrate/use.site.page.hydrate';
import { useUpdatePageMutation } from '@app/generated/valhalla.gql';

type Props = cProps<{ open: boolean; onClose: () => void }>;

type FormPayload = Pick<Page, 'title' | 'isLoneTitle' | 'description'>;

export const MetaUpdateModal: React.FC<Props> = ({ open, onClose }) => {
  const page = useSitePageHydrate();
  const [updatePage] = useUpdatePageMutation();
  const [form] = Form.useForm<FormPayload>();

  React.useEffect(() => {
    form.setFieldsValue({
      title: page.data?.title,
      description: page.data?.description,
      isLoneTitle: page.data?.isLoneTitle,
    });
  }, [page.data, form, open]);

  async function handleSubmit(payload: FormPayload) {
    await updatePage({
      variables: {
        pageId: page.data.id,
        input: {
          title: payload.title,
          description: payload.description,
          isLoneTitle: payload.isLoneTitle,
        },
      },
    });
  }

  return (
    <FormModal
      closeOnSuccess
      form={form}
      withCloseBtn={false}
      open={open}
      onClose={onClose}
      onSubmit={handleSubmit}
      onSuccess={() => page.refetch()}
    >
      <Form.Item
        name="title"
        rules={[
          {
            required: true,
            whitespace: true,
            message: 'Required!',
          },
        ]}
      >
        <TextField label="Title" autoComplete="off" autoCapitalize="words" />
      </Form.Item>
      <Form.Item name="description">
        <TextField
          multiline
          label="Description"
          autoComplete="off"
          autoCapitalize="off"
          inputProps={{ maxLength: 300 }}
        />
      </Form.Item>
    </FormModal>
  );
};
