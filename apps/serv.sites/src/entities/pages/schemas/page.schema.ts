import {
  BaseSchema,
  SimpleModel,
  mongoose,
  typegoose,
} from '@valhalla/serv.core';
import { Exclude, Expose } from 'class-transformer';
import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';

import { EditStatus } from '@app/protobuf';
import { PageSectionSchema } from './section.schema';

registerEnumType(EditStatus, {
  name: 'EditStatus',
});

@ObjectType()
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
  @Exclude()
  site: mongoose.Types.ObjectId;

  @typegoose.prop()
  @Expose()
  @Field({ description: 'Page url', nullable: true })
  slug?: string;

  @typegoose.prop()
  @Expose()
  @Field(() => EditStatus, { description: 'Edit status' })
  status: EditStatus;

  @typegoose.prop()
  @Expose()
  @Field({ description: 'Page title' })
  title: string;

  @typegoose.prop()
  @Expose()
  @Field({
    nullable: true,
    description:
      'Whether the title should be independent or part of the title template',
  })
  isLoneTitle?: boolean;

  @typegoose.prop()
  @Expose()
  @Field({ description: 'Page description', nullable: true })
  description?: string;

  @typegoose.prop()
  @Exclude()
  createdBy: mongoose.Types.ObjectId;

  @typegoose.prop()
  @Expose()
  @Field(() => String, { description: 'Account ID of updater' })
  updatedBy: mongoose.Types.ObjectId;

  @typegoose.prop({ type: PageSectionSchema })
  @Expose()
  @Field(() => [PageSectionSchema], { description: 'Sections' })
  sections: PageSectionSchema[];
}