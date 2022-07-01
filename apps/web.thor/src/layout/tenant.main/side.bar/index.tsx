import * as React from 'react';

import { Logo as AppLogo, cProps, theme } from '@valhalla/react';
import { Divider, List, styled } from '@mui/material';

import Link from 'next/link';
import { SitesItem } from './items/sites';
import { TriggerItem } from './items/trigger';
import clsx from 'clsx';
import styles from './styles.module.css';

type Props = cProps;

export const Sidebar: React.FC<Props> = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <Container className={clsx(isOpen && styles.expanded)}>
      <Header>
        <Link passHref href="/">
          <a>
            <Logo height={30} width={30} />
          </a>
        </Link>
      </Header>
      <Divider />
      <Body>
        <SitesItem />
      </Body>
      <Footer>
        <TriggerItem isOpen={isOpen} onChange={setIsOpen} />
      </Footer>
    </Container>
  );
};

const Logo = styled(AppLogo)`
  cursor: pointer;
`;

const Container = styled('div')`
  margin: ${theme.spacing(1)};
  border-radius: ${theme.shape.borderRadius};
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: solid thin ${theme.palette.divider};
  width: 60px;

  > * {
    width: 100%;
  }
`;

const Header = styled('div')`
  padding: ${theme.spacing(1)};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Footer = styled(List)``;

const Body = styled(List)`
  flex-grow: 1;
  justify-content: flex-start;
  padding: ${theme.spacing(1)} 0;
`;
