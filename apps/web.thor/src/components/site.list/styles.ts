import { Button, css, styled } from '@mui/material';

export const Container = styled('div')`
  display: grid;
  grid-template-columns: repeat(auto-fill, 200px);
  grid-gap: 20px;
  padding: 20px 0;
`;

export const SiteCard = styled(Button)(
  ({ theme }) => css`
    border: solid thin ${theme.palette.grey[400]};
    height: 100px;
  `,
);
