import * as React from 'react';

import { Divider as MuiDivider, css, styled } from '@mui/material';

import { EditButtons } from './edit.btns';
import { FinishBtn } from './finish.btn';
import { Meta } from './meta';
import { SizesRadio } from './sizes.radio';
import { cProps } from '@valhalla/react';

type Props = cProps;

const Container = styled('div')(
  ({ theme }) => css`
    display: flex;
    flex-direction: row;
    border-bottom: solid thin ${theme.palette.divider};
    align-items: center;
    flex-wrap: nowrap;
    padding: ${theme.spacing(0.5)};
  `,
);

const Left = styled('div')`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  flex-basis: 0;
  flex-grow: 1;
`;

const Center = styled('div')`
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-grow: 2;
  flex-basis: 0;
`;

const Right = styled('div')(
  () => css`
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    flex-basis: 0;
    flex-grow: 1;
  `,
);

const Divider = styled(MuiDivider)(
  ({ theme }) => css`
    margin-left: ${theme.spacing(2)};
    margin-right: ${theme.spacing(2)};
  `,
);

export const TopBar: React.FC<Props> = () => {
  return (
    <Container>
      <Left>
        <FinishBtn />
        <Divider flexItem orientation="vertical" variant="middle" />
        <EditButtons />
      </Left>
      <Center>
        <Meta />
      </Center>
      <Right>
        <SizesRadio />
      </Right>
    </Container>
  );
};
