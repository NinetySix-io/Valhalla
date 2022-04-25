import {
  Box,
  Button,
  Container,
  Grid,
  Typography,
  styled,
} from '@mui/material';
import { EmailLoginForm, Logo } from '@valhalla/react';

import { BaseLayout } from '@thor/layout/base';
import { FaArrowLeft } from 'react-icons/fa';
import NextLink from 'next/link';
import { Page } from '@thor/types/next';

const PageContainer = styled(Container)`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

type Payload = {
  email: string;
  password: string;
};

const LoginEmailPage: Page = () => {
  const handleSubmit = (payload: Payload) => {
    //TODO: add logic
  };

  return (
    <PageContainer maxWidth="md">
      <Grid
        container
        spacing={2}
        display="flex"
        direction="row"
        alignItems="center"
        justifyContent="center"
      >
        <Grid
          item
          xs={12}
          md={6}
          display="flex"
          direction="column"
          alignItems="center"
          justifyContent="center"
        >
          <Logo />
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h1" marginBottom={4}>
            Log In
          </Typography>
          <Box>
            <EmailLoginForm onFinish={handleSubmit} />
            <NextLink passHref href="/login">
              <Button
                style={{ width: '100%' }}
                startIcon={<FaArrowLeft />}
                variant="text"
              >
                Return
              </Button>
            </NextLink>
          </Box>
        </Grid>
      </Grid>
    </PageContainer>
  );
};

LoginEmailPage.Layout = BaseLayout;

export default LoginEmailPage;
