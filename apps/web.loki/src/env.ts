import * as Yup from 'yup';

import { buildEnvironment } from '@valhalla/utilities/dist/env';

const schema = Yup.object({
  SERVER: Yup.string().default('http://localhost:3002'),
});

export class Environment extends buildEnvironment({ schema }) {}
