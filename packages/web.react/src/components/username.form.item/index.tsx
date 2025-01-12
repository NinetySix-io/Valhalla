import * as React from 'react';

import { IconButton, InputAdornment, TextField } from '@mui/material';
import { isEmail, isPhoneNumber } from '@valhalla/utilities';

import { Form } from '../form';
import type { Rule } from 'rc-field-form/es/interface';
import type { TextFieldProps } from '@mui/material';
import type { cProps } from '../../types';

type Props = cProps<
  {
    readOnly?: boolean;
    withClear?: boolean;
    autoFocus?: boolean;
    onClear?: () => void;
    onSubmitUsername?: () => void;
  } & Pick<TextFieldProps, 'variant' | 'disabled'>
>;

const key = 'username' as const;

type ComponentType = React.FC<Props> & {
  KEY: typeof key;
};

export const UsernameFormItem: ComponentType = ({
  readOnly,
  autoFocus,
  withClear = true,
  onClear,
  onSubmitUsername,
  ...props
}) => {
  const inputRef = React.useRef<HTMLInputElement>();

  function isTel(value: string) {
    return value && (!Number.isNaN(Number(value)) || value?.startsWith('+'));
  }

  function validateUsername(_rule: Rule, value: string) {
    const valueIsEmail = isEmail(value);
    const valueIsPhone = isPhoneNumber(value);

    if (!value) {
      return Promise.reject(new Error('Required!'));
    } else if (isTel(value) && valueIsPhone) {
      return Promise.reject(new Error('Invalid phone number!'));
    } else if (!valueIsEmail) {
      return Promise.reject(new Error('Invalid email Address!'));
    }

    return Promise.resolve();
  }

  return (
    <Form.Item noStyle>
      {(form) => {
        const username = form.getFieldValue(key) ?? '';

        let label = 'Email / Phone';
        let type: 'email' | 'tel' = 'email';

        if (username) {
          if (isTel(username)) {
            label = 'Phone';
            type = 'tel';
          } else if (username) {
            label = 'Email';
            type = 'email';
          }
        }

        return (
          <Form.Item name={key} rules={[{ validator: validateUsername }]}>
            {(_f, _m, control) => {
              function handleClear() {
                onClear?.();
                inputRef.current?.focus();
              }

              let endAdornment: React.ReactNode;
              if (
                !readOnly &&
                control.value &&
                (isEmail(control.value as string) ||
                  isPhoneNumber(control.value as string))
              ) {
                endAdornment = (
                  <InputAdornment position="end">
                    <IconButton onClick={onSubmitUsername}>Go</IconButton>
                  </InputAdornment>
                );
              } else if (withClear && control.value) {
                endAdornment = (
                  <InputAdornment position="end">
                    <IconButton onClick={handleClear}>X</IconButton>
                  </InputAdornment>
                );
              }

              return (
                <TextField
                  variant="outlined"
                  {...props}
                  value={control.value}
                  onChange={control.onChange}
                  inputRef={inputRef}
                  label={label}
                  autoComplete={type}
                  autoCapitalize="off"
                  autoFocus={autoFocus}
                  InputProps={{
                    readOnly: readOnly,
                    endAdornment,
                  }}
                />
              );
            }}
          </Form.Item>
        );
      }}
    </Form.Item>
  );
};

UsernameFormItem.KEY = key;
