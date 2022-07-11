import { toDto, typegoose } from '@valhalla/serv.core';

import { ElementSchema } from './schema';
import { Element as Proto } from '@app/protobuf';

type Entity = typegoose.DocumentType<ElementSchema> | ElementSchema;
export class ElementTransformer extends ElementSchema {
  constructor(entity: Entity) {
    super();
    Object.assign(this, toDto(entity, { virtuals: false }));
  }

  static fromEntity(entity: Entity) {
    return new ElementTransformer(entity);
  }

  get proto(): Proto {
    return {
      id: this.id,
      isRoot: this.isRoot,
      type: this.type,
      props: this.props,
      parent: this.parent,
      ownBy: this.ownBy.toHexString(),
      updatedBy: this.updatedBy.toHexString(),
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
