import { OrganizationLogo } from './index';
import { storiesOf } from '@storybook/react';
import { faker } from '@faker-js/faker';

storiesOf('Components/Organization/Logo', module).add('Default', () => (
  <OrganizationLogo
    organization={{
      name: faker.company.name(),
    }}
  />
));
