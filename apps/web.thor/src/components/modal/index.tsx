import * as React from 'react';

import {
  Box,
  Button,
  IconButton,
  ModalProps,
  Modal as MuiModal,
  Paper,
  Stack,
  Typography,
  css,
  styled,
} from '@mui/material';
import { FaSolid, Icon, cProps } from '@valhalla/react';

import { LoadingButton } from '@mui/lab';

const Body = styled(Box)``;

const Header = styled(Box)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const Footer = styled(Stack)``;

const Content = styled(Paper)(
  ({ theme }) => css`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: ${theme.palette.background.paper};
    padding: ${theme.spacing(2)} ${theme.spacing(3)};
    max-width: 95vw;
    max-height: 95vh;
    width: fit-content;
  `,
);

type ActionProps =
  | true
  | {
      label: string;
    };

type Props = cProps<Omit<ModalProps, 'onSubmit' | 'onClose'>> & {
  title?: string;
  onSubmit?: () => void;
  onClose?: () => void;
  withCancel?: ActionProps;
  withSubmit?: ActionProps;
  loading?: boolean;
};

export const Modal: React.FC<Props> = ({
  title,
  withCancel,
  withSubmit,
  loading,
  onClose,
  onSubmit,
  ...props
}) => {
  function getButtonLabel(action: ActionProps, fallback: string) {
    return typeof action === 'boolean' ? fallback : action.label;
  }

  return (
    <MuiModal {...props}>
      <Content>
        <Stack direction="column" spacing={3}>
          <Header>
            <Typography variant="h4">{title}</Typography>
            <IconButton disabled={loading} onClick={onClose}>
              <Icon icon={FaSolid.faTimes} />
            </IconButton>
          </Header>
          <Body>{props.children}</Body>
          <Footer direction="row" spacing={2} justifyContent="flex-end">
            {withCancel && (
              <Button onClick={onClose} disabled={loading}>
                {getButtonLabel(withCancel, 'Cancel')}
              </Button>
            )}
            {withSubmit && (
              <LoadingButton
                loading={loading}
                onClick={onSubmit}
                variant="contained"
                disabled={loading}
              >
                {getButtonLabel(withSubmit, 'Submit')}
              </LoadingButton>
            )}
          </Footer>
        </Stack>
      </Content>
    </MuiModal>
  );
};
