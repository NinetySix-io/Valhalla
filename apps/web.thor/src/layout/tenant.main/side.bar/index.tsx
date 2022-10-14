import * as React from 'react';

import {
  Body,
  Container,
  Content,
  Footer,
  Header,
  SidebarDivider,
} from './styles';

import { AccountItem } from './items/account';
import { LogoItem } from './items/logo';
import { SitesItem } from './items/sites';
import type { cProps } from '@valhalla/web.react';
import { useDebounce } from '@valhalla/web.react';

type Props = cProps;

export const Sidebar: React.FC<Props> = ({ ...props }) => {
  const [isOpen, setIsOpen] = useDebounce(false);

  return (
    <Container
      {...props}
      onMouseOver={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <Content expanded={isOpen}>
        <Header>
          <LogoItem />
        </Header>
        <SidebarDivider />
        <Body>
          <SitesItem />
        </Body>
        <Footer>
          <AccountItem />
          <SidebarDivider />
        </Footer>
      </Content>
    </Container>
  );
};
