import * as React from 'react';

import {
  IconButton,
  InputAdornment,
  TextField,
  TextFieldProps,
} from '@mui/material';
import { isEmail, isPhoneNumber } from '@valhalla/utilities';

import { FaTimes } from 'react-icons/fa';
import { Form } from '../form';
import { Rule } from 'rc-field-form/es/interface';
import { cProps } from '../../types';

type Props = cProps<
  {
    readOnly?: boolean;
    withClear?: boolean;
    autoFocus?: boolean;
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
  ...props
}) => {
  const inputRef = React.useRef<HTMLInputElement>();

  return (
    <Form.Item noStyle>
      {(form) => {
        const username = form.getFieldValue(key) ?? '';
        const isNumber = !Number.isNaN(Number(username));
        let label = 'Email / Phone';
        let type: 'email' | 'tel' = 'email';

        const rules: Rule[] = [
          {
            required: true,
            message: 'Required',
          },
        ];

        if (username) {
          if (isNumber) {
            label = 'Phone';
            type = 'tel';

            rules.push({
              validator(_rule, value: string) {
                return isPhoneNumber(value)
                  ? Promise.resolve()
                  : Promise.reject('Invalid phone number!');
              },
            });
          } else {
            label = 'Email';
            rules.push({
              validator(_rule, value: string) {
                return isEmail(value)
                  ? Promise.resolve()
                  : Promise.reject('Invalid email address!');
              },
            });
          }
        }

        return (
          <Form.Item name={key} rules={rules}>
            {(_f, _m, control) => {
              function handleClear() {
                control.onChange?.('');
                inputRef.current?.focus();
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
                    endAdornment: withClear && username && (
                      <InputAdornment position="end">
                        <IconButton onClick={handleClear}>
                          <FaTimes size={15} />
                        </IconButton>
                      </InputAdornment>
                    ),
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
