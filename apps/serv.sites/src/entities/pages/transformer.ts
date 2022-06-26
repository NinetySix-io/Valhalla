import { PageSchema } from './schema';
import { Page as Proto } from '@app/protobuf';
import { typegoose } from '@valhalla/serv.core';

export class PageTransformer extends PageSchema {
  constructor(entity: typegoose.DocumentType<PageSchema> | PageSchema) {
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
      createdAt: this.createdAt.toISOString(),
      updatedAt: this.updatedAt.toISOString(),
      updatedBy: this.updatedBy.toHexString(),
      createdBy: this.createdBy.toHexString(),
      isLoneTitle: this.isLoneTitle,
      title: this.title,
      description: this.description,
      organization: this.organization.toHexString(),
      site: this.site.toHexString(),
      status: this.status,
    };
  }
}
