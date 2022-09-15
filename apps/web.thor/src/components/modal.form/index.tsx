import * as React from 'react';

import type { BoxProps } from '@mui/material';
import { Box } from '@mui/material';
import type { FormProps } from '@valhalla/web.react';
import { Form } from '@valhalla/web.react';

import { Modal } from '@app/components/modal';
import { tryNice } from 'try-nice';

type Props<T> = Pick<FormProps<T>, 'form'> &
  Pick<
    React.ComponentProps<typeof Modal>,
    'withCancel' | 'onClose' | 'open' | 'title' | 'loading' | 'withCloseBtn'
  > &
  Pick<BoxProps, 'width'> & {
    onSubmit?: (payload: T) => void | Promise<void>;
    onSuccess?: () => void;
    onError?: (error: Error) => void;
    closeOnSuccess?: boolean;
    children: React.ReactElement | Array<React.ReactElement>;
  };

export type FormModalProps<T> = Props<T>;
export function FormModal<T>({
  form,
  withCancel = true,
  width = 400,
  open,
  title,
  children,
  loading,
  closeOnSuccess,
  onClose,
  onSubmit,
  onError,
  onSuccess,
}: Props<T>) {
  const [_loading, setLoading] = React.useState(false);

  async function handleSubmit(payload: T) {
    setLoading(true);
    const [, error] = await tryNice(() => onSubmit?.(payload));
    setLoading(false);
    if (error) {
      onError?.(error);
    } else {
      onSuccess();
      closeOnSuccess && onClose?.();
    }
  }

  return (
    <Modal
      withSubmit
      loading={loading || _loading}
      withCancel={withCancel}
      open={open}
      title={title}
      onClose={onClose}
      onSubmit={() => form.submit()}
    >
      <Box width={width}>
        <Form form={form} onFinish={handleSubmit}>
          {children}
        </Form>
      </Box>
    </Modal>
  );
}
