import { GetSitesDocument, SiteStatus } from '@app/generated/valhalla.gql';
import {
  mockApollo,
  mockApolloQuery,
} from '@app/storybook/tools/apollo/mock.apollo';

import type { GetSitesQueryResult } from '@app/generated/valhalla.gql';
import { SiteList } from './index';
import { composeParameters } from '@app/storybook/tools/compose.paramaters';
import { faker } from '@faker-js/faker';
import { storiesOf } from '@storybook/react';

storiesOf('NinetySix/Sites List', module)
  .addParameters(
    composeParameters([
      mockApollo([
        mockApolloQuery<GetSitesQueryResult>(GetSitesDocument, {
          siteList: Array.from({
            length: faker.datatype.number({
              min: 5,
              max: 10,
            }),
          }).map(() => ({
            name: faker.company.name(),
            id: faker.datatype.uuid(),
            status: faker.helpers.arrayElement([
              SiteStatus.DEPLOYED,
              SiteStatus.PENDING,
              SiteStatus.SUSPENDED,
            ]),
          })),
        }),
      ]),
    ]),
  )
  .add('Default', () => <SiteList />);
