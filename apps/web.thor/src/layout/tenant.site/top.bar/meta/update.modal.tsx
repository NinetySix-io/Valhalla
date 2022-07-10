import * as React from 'react';

import { Form, cProps } from '@valhalla/react';
import { PageSchema, useUpdatePageMutation } from '@app/generated/valhalla.gql';

import { FormModal } from '@app/components/modal.form';
import { TextField } from '@mui/material';
import { useSiteId } from '@app/hooks/hydrate/use.site.hydrate';
import { useSitePageHydrate } from '@app/hooks/hydrate/use.site.page.hydrate';

type Props = cProps<{ open: boolean; onClose: () => void }>;

type FormPayload = Pick<PageSchema, 'title' | 'isLoneTitle' | 'description'>;

export const MetaUpdateModal: React.FC<Props> = ({ open, onClose }) => {
  const page = useSitePageHydrate();
  const siteId = useSiteId();
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
        siteId,
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
      <Form.Item name="description" rules={[{ whitespace: true, max: 300 }]}>
        <TextField
          multiline
          label="Description"
          autoComplete="off"
          autoCapitalize="off"
        />
      </Form.Item>
    </FormModal>
  );
};
