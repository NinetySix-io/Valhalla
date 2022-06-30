import * as React from 'react';

import { Box, TextField } from '@mui/material';
import { Form, UsernameFormItem, useChange } from '@valhalla/react';

import { BaseLayout } from '@app/layout/base';
import { FormContainer } from '@app/components/form.container';
import { LoadingButton } from '@mui/lab';
import { Page } from '@app/types/next';
import { isEmail } from '@valhalla/utilities';
import { useLogin } from '@app/graphql/valhalla/hooks/user.login';
import { useRouter } from 'next/router';
import { withAuthorizedRedirect } from '@app/next/plugins/with.authorized';
import { withSsrPlugins } from '@app/next';

type Payload = {
  isEnteringCode?: boolean;
  username: string;
  verificationCode: string;
};

type Props = {
  returnTo?: string;
};

const WithUsernamePage: Page<Props> = () => {
  const router = useRouter();
  const [form] = Form.useForm<Payload>();
  const { login, loginResult, loading, sendVerification } = useLogin();

  function handleSubmit(payload: Payload) {
    login(payload.verificationCode);
  }

  function handleClearUsername() {
    form.setFieldValue('isEnteringCode', false);
    form.setFieldValue('verificationCode', undefined);
  }

  function shouldUpdate(prev: Payload, current: Payload) {
    return prev.isEnteringCode !== current.isEnteringCode;
  }

  async function handleSubmitUsername() {
    const username = form.getFieldValue(UsernameFormItem.KEY);
    form.setFieldValue('isEnteringCode', true);
    sendVerification(username);
  }

  useChange(loginResult, async () => {
    router.replace({
      pathname: '/api/auth/redirect',
      query: router.query,
    });
  });

  return (
    <Box
      maxWidth="md"
      flexGrow={1}
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      width="100%"
    >
      <FormContainer title="Username">
        <Form preserve form={form} onFinish={handleSubmit}>
          <Form.Item noStyle shouldUpdate={shouldUpdate}>
            {({ getFieldValue }) => {
              return (
                <UsernameFormItem
                  disabled={loading}
                  readOnly={getFieldValue('isEnteringCode')}
                  onSubmitUsername={handleSubmitUsername}
                  onClear={handleClearUsername}
                />
              );
            }}
          </Form.Item>
          <Form.Item noStyle shouldUpdate={shouldUpdate}>
            {({ getFieldValue, submit }) => {
              const username = getFieldValue(UsernameFormItem.KEY);
              const isEnteringCode = getFieldValue('isEnteringCode');
              if (!isEnteringCode) {
                return null;
              }

              const channel = isEmail(username) ? 'email' : 'sms';
              const label = `Verification code from ${channel}`;
              return (
                <React.Fragment>
                  <Form.Item name="verificationCode">
                    <TextField
                      disabled={loading}
                      variant="outlined"
                      label={label}
                    />
                  </Form.Item>
                  <Form.Item>
                    <LoadingButton
                      variant="contained"
                      loading={loading}
                      onClick={() => submit()}
                    >
                      Continue
                    </LoadingButton>
                  </Form.Item>
                </React.Fragment>
              );
            }}
          </Form.Item>
        </Form>
      </FormContainer>
    </Box>
  );
};

export const getServerSideProps = withSsrPlugins(
  [withAuthorizedRedirect],
  () => {
    return {
      props: {
        SEO: {
          title: 'Get started',
        },
      },
    };
  },
);

export default WithUsernamePage;

WithUsernamePage.Layout = BaseLayout;
