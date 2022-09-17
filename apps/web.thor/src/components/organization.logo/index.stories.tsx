import { OrganizationLogo } from './index';
import { faker } from '@faker-js/faker';
import { storiesOf } from '@storybook/react';

storiesOf('Components/Organization/Logo', module)
  .add('With Logo', () => (
    <OrganizationLogo
      organization={{
        name: faker.company.name(),
        logoUrl: faker.image.business(),
      }}
    />
  ))
  .add('Without Logo', () => (
    <OrganizationLogo
      organization={{
        name: faker.company.name(),
      }}
    />
  ));
