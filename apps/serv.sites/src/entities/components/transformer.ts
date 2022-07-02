import { ComponentSchema } from './schema';
import { Component as Proto } from '@app/protobuf';
import { typegoose } from '@valhalla/serv.core';

export class ComponentTransformer extends ComponentSchema {
  constructor(
    entity: typegoose.DocumentType<ComponentSchema> | ComponentSchema,
  ) {
    super();
    Object.assign(
      this,
      typegoose.isDocument(entity)
        ? entity.toObject({ virtuals: false })
        : entity,
    );
  }

  get proto(): Proto {
    return {
      id: this.id,
      name: this.name,
      ownBy: this.ownBy.toHexString(),
      elements: this.elements,
      createdBy: this.createdBy.toHexString(),
      updatedBy: this.updatedBy.toHexString(),
      createdAt: this.createdAt.toString(),
      updatedAt: this.updatedAt.toString(),
    };
  }
}
