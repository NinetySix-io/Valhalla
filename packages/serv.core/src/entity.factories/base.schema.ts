import { Directive, Field, ID, ObjectType } from '@nestjs/graphql';
import { Exclude, Expose } from 'class-transformer';
import { mongoose, prop } from '@typegoose/typegoose';

import { Base } from '@typegoose/typegoose/lib/defaultClasses';

@ObjectType({ isAbstract: true })
@Directive('@extends')
@Directive('@key(fields: "id")')
export class BaseSchema {
  @Exclude()
  @prop({
    type: mongoose.Schema.Types.ObjectId,
    default: () => new mongoose.Types.ObjectId(),
  })
  _id!: mongoose.Types.ObjectId;

  @prop({ type: Date })
  @Field(() => Date, { description: 'Date entity was created' })
  @Expose()
  createdAt!: Date;

  @prop({ type: Date })
  @Field(() => Date, { description: 'Date entity was updated' })
  @Expose()
  updatedAt!: Date;

  @Field(() => ID, { description: 'Identifier of the entity' })
  @Expose()
  get id() {
    return String(this._id);
  }
}

export interface BaseSchema extends Base<mongoose.Types.ObjectId> {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}
