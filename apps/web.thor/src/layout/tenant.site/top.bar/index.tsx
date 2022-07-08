import * as React from 'react';

import { Divider as MuiDivider, css, styled } from '@mui/material';

import { EditButtons } from './edit.buttons';
import { ExitButton } from '../exit.btn';
import { HistoryBtn } from './history.btn';
import { PublishBtn } from './publish.btn';
import { SizeButtons } from './size.btns';
import { cProps } from '@valhalla/react';

type Props = cProps;

const Container = styled('div')(
  ({ theme }) => css`
    display: flex;
    flex-direction: row;
    padding: ${theme.spacing(0.5)} ${theme.spacing(3)};
    border-bottom: solid thin ${theme.palette.divider};
    align-items: center;
  `,
);

const Left = styled('div')`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  flex-basis: 1;
  flex-grow: 1;
`;

const Center = styled('div')`
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-grow: 2;
  flex-basis: 1;
`;

const Right = styled('div')`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  flex-basis: 1;
  flex-grow: 1;
`;

const Divider = styled(MuiDivider)(
  ({ theme }) => css`
    margin: ${theme.spacing(1)} ${theme.spacing(2)};
  `,
);

export const TopBar: React.FC<Props> = () => {
  return (
    <Container>
      <Left>
        <ExitButton />
      </Left>
      <Center>
        <EditButtons />
        <Divider flexItem orientation="vertical" />
        <SizeButtons />
        <Divider flexItem orientation="vertical" />
        <HistoryBtn />
      </Center>
      <Right>
        <PublishBtn />
      </Right>
    </Container>
  );
};
