import * as React from 'react';

import { isEmail, isNil, isPhoneNumber } from '@valhalla/utilities';
import {
  useLoginWithEmailMutation,
  useLoginWithPhoneMutation,
  useSendVerificationToEmailMutation,
  useSendVerificationToPhoneMutation,
} from '../generated.gql';

/**
 * Hook to facilitate login in
 * @param type
 * @returns
 */
export function useLogin() {
  const [username, setUsername] = React.useState<string>();
  const isEmailAddress = isEmail(username);
  const isPhone = isPhoneNumber(username);
  const hasUsername = !isNil(username);
  const [loginWithEmail, loginEmailProps] = useLoginWithEmailMutation();
  const [loginWithPhone, loginPhoneProps] = useLoginWithPhoneMutation();
  const [emailVerification, emailVProps] = useSendVerificationToEmailMutation();
  const [textVerification, textVProps] = useSendVerificationToPhoneMutation();
  const loginResult = isEmailAddress
    ? loginEmailProps.data?.loginWithEmail
    : loginPhoneProps.data?.loginWithPhone;
  const verificationId = isEmailAddress
    ? emailVProps.data?.sendEmailVerificationCode
    : textVProps.data?.sendPhoneVerificationCode;
  const isLoggingIn = isEmailAddress
    ? loginEmailProps.loading
    : loginPhoneProps.loading;

  const login = async (verificationCode: string) => {
    if (!hasUsername) {
      return;
    }

    if (isEmailAddress) {
      await loginWithEmail({
        variables: {
          email: username,
          verificationCode,
          verificationId,
        },
      });
    } else if (isPhone) {
      await loginWithPhone({
        variables: {
          phone: username,
          verificationCode,
          verificationId,
        },
      });
    }
  };

  const sendVerification = async () => {
    if (!hasUsername) {
      return;
    }

    if (isEmailAddress) {
      await emailVerification({
        variables: {
          email: username,
        },
      });
    } else if (isPhone) {
      await textVerification({
        variables: {
          phone: username,
        },
      });
    }
  };

  return {
    login,
    sendVerification,
    setUsername,
    isLoggingIn,
    loginResult,
  };
}
