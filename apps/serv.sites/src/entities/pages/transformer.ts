import { DocumentType, isDocument } from '@typegoose/typegoose';

import { PageSchema } from './schema';
import { Page as Proto } from '@app/protobuf';

export class PageTransformer extends PageSchema {
  constructor(entity: DocumentType<PageSchema> | PageSchema) {
    super();
    Object.assign(
      this,
      isDocument(entity) ? entity.toObject({ virtuals: false }) : entity,
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
