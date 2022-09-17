import {
  mockApollo,
  mockApolloQuery,
} from '@app/storybook/tools/apollo/mock.apollo';

import { GetOrgsMembershipListDocument } from '@app/generated/valhalla.gql';
import type { GetOrgsMembershipListQueryResult } from '@app/generated/valhalla.gql';
import { OrganizationList } from './index';
import { composeParameters } from '@app/storybook/tools/compose.paramaters';
import { faker } from '@faker-js/faker';
import { storiesOf } from '@storybook/react';

storiesOf('NinetySix/Organizations List', module)
  .addParameters(
    composeParameters([
      mockApollo([
        mockApolloQuery<GetOrgsMembershipListQueryResult>(
          GetOrgsMembershipListDocument,
          {
            organizations: Array.from({
              length: faker.datatype.number({
                min: 5,
                max: 10,
              }),
            }).map(() => ({
              name: faker.company.name(),
              id: faker.datatype.uuid(),
              slug: faker.internet.url(),
              logoUrl: faker.datatype.boolean()
                ? faker.image.business(248, 148)
                : undefined,
            })),
          },
        ),
      ]),
    ]),
  )
  .add('Default', () => <OrganizationList />);
