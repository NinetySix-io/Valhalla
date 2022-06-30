import * as React from 'react';

import {
  VerificationChannel,
  useLoginWithVerificationMutation,
  useSendVerificationMutation,
} from '../generated.gql';
import { isEmail, isPhoneNumber } from '@valhalla/utilities';

/**
 * Hook to facilitate login in
 * @param type
 * @returns
 */
export function useLogin() {
  const username = React.useRef<string>();
  const [_login, { loading, data }] = useLoginWithVerificationMutation();
  const [_sendVerification, { data: verificationId }] =
    useSendVerificationMutation();

  const login = (verificationCode: string) => {
    _login({
      variables: {
        verificationCode,
        verificationId: verificationId.sendVerificationCode,
        username: username.current,
      },
    });
  };

  const sendVerification = (destination: string) => {
    const destIsEmail = isEmail(destination);
    const destIsPhone = isPhoneNumber(destination);
    let channel: VerificationChannel;
    if (!destIsEmail && !destIsPhone) {
      throw new Error('Not email or phone!');
    } else if (destIsEmail) {
      channel = VerificationChannel.EMAIL;
    } else if (destIsPhone) {
      channel = VerificationChannel.SMS;
    }

    username.current = destination;
    _sendVerification({
      variables: {
        destination,
        channel,
      },
    });
  };

  return {
    login,
    sendVerification,
    loading,
    loginResult: data?.loginWithVerification,
  };
}
