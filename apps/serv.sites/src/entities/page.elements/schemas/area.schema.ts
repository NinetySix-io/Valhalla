import { BaseSchema, SimpleModel, typegoose } from '@valhalla/serv.core';

@SimpleModel()
export class PageElementAreaSchema extends BaseSchema {
  @typegoose.prop()
  x: number;

  @typegoose.prop()
  y: number;

  @typegoose.prop()
  height: number;

  @typegoose.prop()
  width: number;

  @typegoose.prop()
  isVisible: boolean;
}
