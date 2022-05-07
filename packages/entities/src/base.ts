import { Base } from '@typegoose/typegoose/lib/defaultClasses';

export abstract class BaseEntity {
  _id: string;
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface BaseEntity extends Base<string> {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}
