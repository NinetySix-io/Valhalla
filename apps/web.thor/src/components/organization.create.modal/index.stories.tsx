import * as React from 'react';

import type { ComponentMeta, ComponentStory } from '@storybook/react';
import {
  CreateOrganizationDocument,
  OrganizationPlan,
} from '@app/generated/valhalla.gql';
import type {
  CreateOrganizationMutationResult,
  CreateOrganizationMutationVariables,
} from '@app/generated/valhalla.gql';
import {
  mockApollo,
  mockApolloMutation,
} from '@app/storybook/tools/apollo/mock.apollo';

import { Button } from '@mui/material';
import { OrganizationCreateModal } from './index';
import { action } from '@storybook/addon-actions';
import { composeParameters } from '@app/storybook/tools/compose.paramaters';
import { faker } from '@faker-js/faker';

type ComponentType = typeof OrganizationCreateModal;

const Meta: ComponentMeta<ComponentType> = {
  title: 'NinetySix/Forms/Create Organization',
  component: OrganizationCreateModal,
};

const Template: ComponentStory<never> = () => {
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
        Create Organization
      </Button>
      <OrganizationCreateModal
        open={isOpen}
        onFinish={action('Finish')}
        onClose={() => {
          action('Close')();
          setIsOpen(false);
        }}
      />
    </div>
  );
};

export const Default = Template.bind({});

Default.parameters = composeParameters([
  mockApollo([
    mockApolloMutation<
      CreateOrganizationMutationVariables,
      CreateOrganizationMutationResult
    >(
      CreateOrganizationDocument,
      {
        name: faker.company.name(),
        plan: OrganizationPlan.FREE,
      },
      {
        createOrganization: {
          name: faker.company.name(),
          id: faker.datatype.uuid(),
          slug: faker.internet.url(),
          plan: OrganizationPlan.FREE,
        },
      },
    ),
  ]),
]);

export default Meta;
