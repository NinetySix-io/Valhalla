import {
  BaseSchema,
  SimpleModel,
  mongoose,
  typegoose,
} from '@valhalla/serv.core';

import { EditStatus } from '@app/protobuf';
import { Expose } from 'class-transformer';
import { PageSectionSchema } from './section.schema';

@SimpleModel('pages')
@typegoose.index({ site: 1 })
@typegoose.index({ 'sections._id': 1 })
@typegoose.index(
  { site: 1, slug: 1 },
  {
    unique: true,
    partialFilterExpression: {
      slug: {
        $type: 'string',
      },
    },
  },
)
export class PageSchema extends BaseSchema {
  @typegoose.prop()
  site: mongoose.Types.ObjectId;

  @typegoose.prop()
  slug?: string;

  @typegoose.prop()
  status: EditStatus;

  @typegoose.prop()
  title: string;

  @typegoose.prop({ default: false })
  isLoneTitle: boolean;

  @typegoose.prop()
  description?: string;

  @typegoose.prop()
  createdBy: mongoose.Types.ObjectId;

  @typegoose.prop()
  @Expose()
  updatedBy: mongoose.Types.ObjectId;

  @typegoose.prop({ type: PageSectionSchema })
  sections: PageSectionSchema[];
}
