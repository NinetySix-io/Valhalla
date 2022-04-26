import {
  Box,
  Button,
  Container,
  Grid,
  Typography,
  styled,
} from '@mui/material';
import { EmailLoginForm, GetServerSideProps, Logo } from '@valhalla/react';

import { BaseLayout } from '@web.thor/layout/base';
import { FaArrowLeft } from 'react-icons/fa';
import NextLink from 'next/link';
import { Page } from '@web.thor/types/next';
import { useLoginMutation } from '@web.thor/graphql/odin/generated.gql';
import { withApollo } from '@web.thor/graphql/odin/with.apollo';

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
  const [login, { loading }] = useLoginMutation();

  const handleSubmit = async (payload: Payload) => {
    const result = await login({
      variables: {
        input: {
          username: payload.email,
          password: payload.password,
        },
      },
    });

    if (result?.data.login.token) {
      alert('Logged In');
    }
  };

  return (
    <PageContainer maxWidth="md">
      <Grid
        container
        spacing={2}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Grid
          item
          xs={12}
          md={6}
          display="flex"
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
            <EmailLoginForm onFinish={handleSubmit} loading={loading} />
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

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {
      SEO: {
        title: 'Login with Email',
      },
    },
  };
};

export default withApollo(LoginEmailPage);
