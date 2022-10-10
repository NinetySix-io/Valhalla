import { SimpleModel, typegoose } from '@valhalla/serv.core';

import { PageElementSchema } from '../schemas';
import mongoose from 'mongoose';

@SimpleModel(null, { allowMixed: true })
export class PageElementTextSchema extends PageElementSchema {
  //TODO: type this
  @typegoose.prop({ type: mongoose.Schema.Types.Mixed })
  json: unknown;

  @typegoose.prop()
  html: string;
}
