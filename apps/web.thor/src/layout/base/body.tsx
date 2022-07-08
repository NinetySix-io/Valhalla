import { Box, styled } from '@mui/material';

export const LayoutBody = styled(Box)`
  display: flex;
  flex-direction: column;
  overflow: auto;
  flex-grow: 1;
  align-items: center;

  > * {
    width: 100%;
  }
`;
