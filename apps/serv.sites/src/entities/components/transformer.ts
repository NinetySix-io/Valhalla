import { toDto, typegoose } from '@valhalla/serv.core';

import { ComponentSchema } from './schema';
import { Component as Proto } from '@app/protobuf';

export class ComponentTransformer extends ComponentSchema {
  constructor(
    entity: typegoose.DocumentType<ComponentSchema> | ComponentSchema,
  ) {
    super();
    Object.assign(this, toDto(entity, { virtuals: false }));
  }

  get proto(): Proto {
    return {
      id: this.id,
      name: this.name,
      ownBy: this.ownBy.toHexString(),
      elements: this.elements,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      createdBy: this.createdBy.toHexString(),
      updatedBy: this.updatedBy.toHexString(),
    };
  }
}
