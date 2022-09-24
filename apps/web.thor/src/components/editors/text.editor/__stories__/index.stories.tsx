import { TextEditor } from '..';
import { action } from '@storybook/addon-actions';
import { faker } from '@faker-js/faker';
import { makeArray } from '@app/storybook/lib/array';
import { storiesOf } from '@storybook/react';

storiesOf('NinetySix/Editors/Text Editor', module).add('Default', () => (
  <TextEditor
    onChange={action('onChange')}
    value={{
      type: 'doc',
      content: makeArray(3, 1).map(() => ({
        type: 'paragraph',
        content: makeArray(10, 3).map(() => ({
          type: 'text',
          text: faker.lorem.paragraph(),
        })),
      })),
    }}
  />
));
