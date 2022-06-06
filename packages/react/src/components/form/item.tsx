import * as React from 'react';

import { Box, Typography, styled } from '@mui/material';
import { FormInstance, Meta } from 'rc-field-form/es/interface';

import { Field } from 'rc-field-form';
import { FieldProps } from 'rc-field-form/es/Field';
import { red } from '@mui/material/colors';

type Props<T, P> = Omit<FieldProps, 'children'> & {
  label?: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
  id?: string;
  noStyle?: boolean;
  children?:
    | ((
        form: FormInstance<P>,
        meta: Meta,
        control: {
          value?: T;
          onChange?: (...params: unknown[]) => void;
        },
      ) => React.ReactElement | undefined | null)
    | React.ReactElement;
};

const Container = styled(Box)`
  position: relative;
`;

const Content = styled(Box)`
  display: flex;
  flex-direction: column;
`;

const Label = styled('label')`
  flex: none;
  margin-bottom: 5px;
`;

const Error = styled(Typography)`
  color: ${red[400]};
  font-size: small;
  min-height: 30px;
`;

export function FormItem<T, P = unknown>({
  label,
  name,
  style,
  className,
  id,
  children,
  noStyle,
  ...props
}: Props<T, P>) {
  return (
    <Field name={name} {...props}>
      {(control, meta, form) => {
        if (!children) {
          return;
        }

        const error = meta.errors?.[0];
        const childNode =
          typeof children === 'function'
            ? children(form, meta, control)
            : React.cloneElement(children, control);

        if (noStyle) {
          return childNode;
        }

        return (
          <Container style={style} className={className} id={id}>
            <Content>
              {label && <Label>{label}</Label>}
              {childNode}
            </Content>
            <Error>{error ?? ''}</Error>
          </Container>
        );
      }}
    </Field>
  );
}
