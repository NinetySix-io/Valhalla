import type { ComponentMeta, ComponentStory } from '@storybook/react';
import {
  mockApollo,
  mockApolloQuery,
} from '@app/storybook/tools/apollo/mock.apollo';

import { AccountBtn } from './index';
import { GetAccountDocument } from '@app/generated/valhalla.gql';
import type { GetAccountQueryResult } from '@app/generated/valhalla.gql';
import { composeParameters } from '@app/storybook/tools/compose.paramaters';
import { faker } from '@faker-js/faker';
type ComponentType = typeof AccountBtn;

const Meta: ComponentMeta<ComponentType> = {
  title: 'Components/Account Button',
  component: AccountBtn,
};

const Template: ComponentStory<never> = () => {
  return <AccountBtn />;
};

export const Default = Template.bind({});

Default.parameters = composeParameters([
  mockApollo([
    mockApolloQuery<GetAccountQueryResult>(GetAccountDocument, {
      account: {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        displayName: faker.name.fullName(),
      },
    }),
  ]),
]);

export default Meta;
