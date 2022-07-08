import * as React from 'react';

import { css, styled } from '@mui/material';

import { ExitButton } from '../exit.btn';
import { PublishBtn } from './publish.btn';
import { RedoBtn } from './redo.btn';
import { UndoBtn } from './undo.btn';
import { cProps } from '@valhalla/react';

type Props = cProps;

const Container = styled('div')(
  ({ theme }) => css`
    display: flex;
    flex-direction: row;
    padding: ${theme.spacing(0.5)} ${theme.spacing(1)};
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

export const TopBar: React.FC<Props> = () => {
  return (
    <Container>
      <Left>
        <ExitButton />
      </Left>
      <Center>
        <UndoBtn />
        <RedoBtn />
      </Center>
      <Right>
        <PublishBtn />
      </Right>
    </Container>
  );
};
