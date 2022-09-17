import * as React from 'react';

import { Button } from '@mui/material';
import { CreateSiteModal } from './index';
import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';

storiesOf('NinetySix/Forms/Create Site', module).add('Default', () => {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <div>
      <Button
        variant="contained"
        onClick={(event) => {
          action('Open')(event);
          setIsOpen(true);
        }}
      >
        Create Site
      </Button>
      <CreateSiteModal
        isOpen={isOpen}
        onClose={() => {
          action('Close')();
          setIsOpen(false);
        }}
      />
    </div>
  );
});
