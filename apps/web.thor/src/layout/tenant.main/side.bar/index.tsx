import * as React from 'react';

import { Logo as AppLogo, cProps } from '@valhalla/react';
import { Divider, List, css, styled } from '@mui/material';

import { AccountItem } from './items/account';
import Link from 'next/link';
import { SitesItem } from './items/sites';
import { TriggerItem } from './items/trigger';

const Logo = styled(AppLogo)`
  cursor: pointer;
`;

const Container = styled('div')<{ expanded?: boolean }>(
  ({ theme, expanded }) => css`
    background-color: ${theme.palette.primary.dark};
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border: solid thin ${theme.palette.divider};
    width: ${expanded ? 200 : 60}px;

    > * {
      width: 100%;
    }
  `,
);

const Header = styled('div')(
  ({ theme }) => css`
    padding: ${theme.spacing(1)};
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  `,
);

const Footer = styled(List)``;

const SidebarDivider = styled(Divider)(
  ({ theme }) => css`
    background-color: ${theme.palette.grey[800]};
    margin-top: ${theme.spacing(1)};
    margin-bottom: ${theme.spacing(1)};
  `,
);

const Body = styled(List)(
  ({ theme }) => css`
    flex-grow: 1;
    justify-content: flex-start;
    padding: ${theme.spacing(1)} 0;
  `,
);

type Props = cProps;

export const Sidebar: React.FC<Props> = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <Container expanded={isOpen}>
      <Header>
        <Link passHref href="/">
          <a>
            <Logo variant="white" height={30} width={30} />
          </a>
        </Link>
      </Header>
      <SidebarDivider />
      <Body>
        <SitesItem />
      </Body>
      <Footer>
        <AccountItem />
        <SidebarDivider />
        <TriggerItem isOpen={isOpen} onChange={setIsOpen} />
      </Footer>
    </Container>
  );
};
