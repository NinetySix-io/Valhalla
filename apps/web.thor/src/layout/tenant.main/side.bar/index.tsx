import * as React from 'react';

import { Divider, List, css, styled } from '@mui/material';
import { cProps, useDebounce } from '@valhalla/react';

import { AccountItem } from './items/account';
import { LogoItem } from './items/logo';
import { SitesItem } from './items/sites';

const Container = styled('div')(
  ({ theme }) => css`
    display: flex;
    flex-direction: row;
    background-color: ${theme.palette.common.white};
    position: fixed;
    left: 0;
    bottom: 0;
    top: 0;
    z-index: 1;
  `,
);

const Content = styled('div')<{
  expanded?: boolean;
  initialWidth: number;
}>(
  ({ theme, expanded, initialWidth }) => css`
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    transition: all 0.3s;
    border: solid thin ${theme.palette.divider};
    width: ${expanded ? 200 : initialWidth}px;

    > * {
      width: 100%;
    }
  `,
);

const Header = styled(List)`
  padding: 0;
`;

const Footer = styled(List)`
  padding: 0;
`;

const SidebarDivider = styled(Divider)(
  ({ theme }) => css`
    background-color: ${theme.palette.divider};
  `,
);

const Body = styled(List)(
  ({ theme }) => css`
    flex-grow: 1;
    justify-content: flex-start;
    padding: ${theme.spacing(1)} 0;
  `,
);

type Props = cProps & { initialWidth: number };

export const Sidebar: React.FC<Props> = ({ initialWidth, ...props }) => {
  const [isOpen, setIsOpen] = useDebounce(false);

  return (
    <Container
      {...props}
      onMouseOver={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <Content expanded={isOpen} initialWidth={initialWidth}>
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
