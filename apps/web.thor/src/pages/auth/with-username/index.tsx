import * as React from 'react';

import { Box, IconButton, InputAdornment, TextField } from '@mui/material';
import {
  FaSolid,
  Form,
  Icon,
  UsernameFormItem,
  useChange,
} from '@valhalla/react';

import { BaseLayout } from '@app/layout/base';
import { FormContainer } from '@app/components/form.container';
import { LoadingButton } from '@mui/lab';
import { MetaSlice } from '@app/redux/slices/meta';
import { PAGES } from '@app/PAGES_CONSTANTS';
import { Page } from '@app/types/next';
import { isEmail } from '@valhalla/utilities';
import { useLogin } from '@app/graphql/valhalla/hooks/user.login';
import { useReduxDispatch } from '@app/redux/hooks';
import { useRouter } from 'next/router';
import { withPublicSsrContext } from '@app/next/with.app.ctx';

type Payload = {
  verificationCode: string;
};

const GetStartedWithUsernamePage: Page = () => {
  const router = useRouter();
  const dispatch = useReduxDispatch();
  const [form] = Form.useForm<Payload>();
  const [username, setUsername] = React.useState<string>();
  const { login, loginResult, isLoggingIn, sendVerification } =
    useLogin(username);

  function handleFieldsChange(
    fields: Array<{
      name: string[];
      value: unknown;
    }>,
  ) {
    const usernameField = fields.find(
      (field) => field.name[0] === UsernameFormItem.KEY,
    );

    if (usernameField && usernameField.value !== username) {
      setUsername(usernameField.value as string | undefined);
    }
  }

  function handleSubmit(payload: Payload) {
    login(payload.verificationCode);
  }

  useChange(username, () => {
    sendVerification();
  });

  useChange(loginResult, async () => {
    await dispatch(
      MetaSlice.actions.setAccessToken({
        accessToken: loginResult.accessToken,
        accessTokenExpires: new Date(loginResult.accessTokenExpiresAt),
      }),
    );

    router.push(PAGES.HOME);
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
        <Form
          form={form}
          onFieldsChange={handleFieldsChange}
          onFinish={handleSubmit}
        >
          <Form.Item noStyle>
            {({ getFieldValue }) => {
              return (
                <UsernameFormItem
                  disabled={isLoggingIn}
                  readOnly={Boolean(getFieldValue(UsernameFormItem.KEY))}
                />
              );
            }}
          </Form.Item>
          <Form.Item noStyle>
            {({ getFieldValue }) => {
              const username = getFieldValue(UsernameFormItem.KEY);
              if (!username) {
                return null;
              }

              const channel = isEmail(username) ? 'email' : 'sms';
              const label = `Verification code from ${channel}`;
              return (
                <Form.Item name="verificationCode">
                  <TextField
                    disabled={isLoggingIn}
                    variant="outlined"
                    label={label}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton>
                            <Icon height={15} icon={FaSolid.faRedo} />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Form.Item>
              );
            }}
          </Form.Item>
          <Form.Item noStyle>
            {({ getFieldValue, submit }) => {
              const verificationCode = getFieldValue('verificationCode');
              if (!verificationCode) {
                return null;
              }

              return (
                <Form.Item>
                  <LoadingButton
                    variant="contained"
                    loading={isLoggingIn}
                    onClick={() => submit()}
                  >
                    Continue
                  </LoadingButton>
                </Form.Item>
              );
            }}
          </Form.Item>
        </Form>
      </FormContainer>
    </Box>
  );
};

export const getServerSideProps = withPublicSsrContext(() => {
  return {
    props: {
      SEO: {
        title: 'Authentication',
      },
    },
  };
});

GetStartedWithUsernamePage.Layout = BaseLayout;

export default GetStartedWithUsernamePage;
