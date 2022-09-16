import { MetaStore } from '@app/global.store/meta';
import { storiesOf } from '@storybook/react';
import { Logo } from './index';
import { styled } from '@mui/material';

const StyledLogo = styled(Logo)`
  width: 100px;
  height: 100px;
  max-width: 100vw;
  max-height: 100vh;
`;

storiesOf('NinetySix/Logo', module)
  .addParameters({ layout: 'centered' })
  .add('Light', () => {
    MetaStore.actions.setIsDarkMode(false);
    return <StyledLogo />;
  })
  .add(
    'Dark',
    () => {
      MetaStore.actions.setIsDarkMode(true);
      return <StyledLogo />;
    },
    {
      backgrounds: {
        default: 'dark',
        values: [{ name: 'dark', value: '#000' }],
      },
    },
  );
