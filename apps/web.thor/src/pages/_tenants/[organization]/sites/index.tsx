import * as React from 'react';

import { Box, Button, TextField } from '@mui/material';
import { FaSolid, Form, Icon } from '@valhalla/react';

import { Modal } from '@app/components/modal';
import { Page } from '@app/types/next';
import { TenantMainLayout } from '@app/layout/tenant.main';
import { composeNextPlugins } from '@app/next/plugins/compose.plugins';
import { makeTenantStaticPaths } from '@app/next/tenant/make.static.paths';
import { useCreateSiteMutation } from '@app/graphql/valhalla/generated.gql';
import { withApollo } from '@app/next/plugins/presets/with.apollo';
import { withOrgContext } from '@app/next/plugins/presets/with.org.context';
import { withRedux } from '@app/next/plugins/presets/with.redux';

type FormPayload = {
  name: string;
};

const SiteListPage: Page = () => {
  const [form] = Form.useForm<FormPayload>();
  const [addingSite, setAddingSite] = React.useState(false);
  const [createSite, { loading }] = useCreateSiteMutation();

  function handleClose() {
    if (loading) {
      return;
    }

    setAddingSite(false);
    form.resetFields();
  }

  async function handleFinish(payload: FormPayload) {
    await createSite({
      variables: {
        name: payload.name,
      },
    });

    setAddingSite(false);
  }

  return (
    <div>
      <Button onClick={() => setAddingSite(true)}>
        <Icon icon={FaSolid.faPlus} />
        Add Site
      </Button>
      <Modal
        title="Add Site"
        open={addingSite}
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
    </div>
  );
};

export const getStaticPaths = makeTenantStaticPaths();
export const getStaticProps = composeNextPlugins(
  [withApollo, withRedux, withOrgContext],
  () => {
    return {
      props: {
        SEO: {
          title: 'Sites',
        },
      },
    };
  },
);

SiteListPage.Layout = TenantMainLayout;
export default SiteListPage;
