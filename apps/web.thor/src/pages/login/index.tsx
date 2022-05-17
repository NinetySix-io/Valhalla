import {
  AppleButton,
  FacebookButton,
  GithubButton,
  GoogleButton,
  Logo,
} from '@valhalla/react';
import { Button, Container, Grid, Typography, styled } from '@mui/material';

import { BaseLayout } from '@app/layout/base';
import { FaUser } from 'react-icons/fa';
import { GetServerSideProps } from '@valhalla/react';
import NextLink from 'next/link';
import { Page } from '@app/types/next';
import React from 'react';
import cx from 'clsx';
import styles from './styles.module.css';

const PageContainer = styled(Container)`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const LoginPage: Page = () => {
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
        <Grid
          container
          item
          xs={12}
          md={6}
          spacing={3}
          maxWidth="100%"
          width="300px"
        >
          <Grid item>
            <Typography variant="h1">Log In</Typography>
          </Grid>
          <Grid item container display="flex" direction="column" spacing={1}>
            <Grid item>
              <GoogleButton fullWidth className={cx(styles.button)}>
                Login with Google
              </GoogleButton>
            </Grid>
            <Grid item>
              <AppleButton fullWidth className={cx(styles.button)}>
                Login with Apple
              </AppleButton>
            </Grid>
            <Grid item>
              <FacebookButton fullWidth className={cx(styles.button)}>
                Login with Facebook
              </FacebookButton>
            </Grid>
            <Grid item>
              <GithubButton fullWidth className={cx(styles.button)}>
                Login with Github
              </GithubButton>
            </Grid>
            <Grid item>
              <NextLink passHref href="/login/username">
                <Button
                  fullWidth
                  className={cx(styles.button)}
                  variant="outlined"
                  startIcon={<FaUser />}
                >
                  Login with Email
                </Button>
              </NextLink>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {
      SEO: {
        title: 'Login',
      },
    },
  };
};

LoginPage.Layout = BaseLayout;

export default LoginPage;
