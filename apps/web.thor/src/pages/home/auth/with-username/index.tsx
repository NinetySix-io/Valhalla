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
import { useSessionResume } from '@app/hooks/use.session.resume';

type Payload = {
  isEnteringCode?: boolean;
  username: string;
  verificationCode: string;
};

const GetStartedWithUsernamePage: Page = () => {
  useSessionResume();
  const router = useRouter();
  const dispatch = useReduxDispatch();
  const [form] = Form.useForm<Payload>();
  const { login, loginResult, isLoggingIn, sendVerification, setUsername } =
    useLogin();

  function handleSubmit(payload: Payload) {
    login(payload.verificationCode);
  }

  function handleClearUsername() {
    form.setFieldValue('isEnteringCode', false);
  }

  async function handleSubmitUsername() {
    const username = form.getFieldValue(UsernameFormItem.KEY);

    form.setFieldValue('isEnteringCode', true);
    setUsername(username);
    sendVerification();
  }

  useChange(loginResult, async () => {
    await dispatch(
      MetaSlice.actions.setAccessToken({
        accessToken: loginResult.accessToken,
        accessTokenExpires: new Date(loginResult.accessTokenExpiresAt),
      }),
    );

    router.push(PAGES.ME);
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
          <Form.Item noStyle>
            {({ getFieldValue }) => {
              return (
                <UsernameFormItem
                  disabled={isLoggingIn}
                  readOnly={getFieldValue('isEnteringCode')}
                  onSubmitUsername={handleSubmitUsername}
                  onClear={handleClearUsername}
                />
              );
            }}
          </Form.Item>
          <Form.Item noStyle>
            {({ getFieldValue }) => {
              const username = getFieldValue(UsernameFormItem.KEY);
              const isEnteringCode = getFieldValue('isEnteringCode');
              if (!isEnteringCode) {
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

GetStartedWithUsernamePage.Layout = BaseLayout;

export default GetStartedWithUsernamePage;
