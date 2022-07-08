import * as React from 'react';

import { Container, styled } from '@mui/material';

import { Layout } from '@app/types/next';
import { NextSeo } from 'next-seo';

const Wrapper = styled('div')`
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  max-height: 100vh;
  max-width: 100vw;
  overflow: hidden;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
`;

type Props = React.ComponentProps<typeof Container>;

export const BaseLayout: Layout<Props> = ({ SEO, children, ...props }) => {
  return (
    <Wrapper {...props}>
      <NextSeo {...SEO} />
      {children}
    </Wrapper>
  );
};
