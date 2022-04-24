import * as React from 'react';

import { Box, Typography, styled } from '@mui/material';

import { Field } from 'rc-field-form';
import { FieldProps } from 'rc-field-form/es/Field';
import { red } from '@mui/material/colors';

type Props = FieldProps & {
  label?: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
  id?: string;
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

export const FormItem: React.FC<Props> = ({
  label,
  name,
  style,
  className,
  id,
  children,
  ...props
}) => {
  return (
    <Field name={name} {...props}>
      {(control, meta, form) => {
        const error = meta.errors?.[0];
        const childNode =
          typeof children === 'function'
            ? children(control, meta, form)
            : React.cloneElement(children as React.ReactElement, {
                ...control,
              });

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
};
