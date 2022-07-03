import { Global, Module, ModuleMetadata } from '@nestjs/common';

import { OrgMemberSchema } from './org.members/schema';
import { OrgMembersModel } from './org.members';
import { OrganizationSchema } from './organizations/schema';
import { OrganizationsModel } from './organizations';
import { TypegooseModule } from 'nestjs-typegoose';

const ModelProviders: ModuleMetadata['providers'] = [
  OrganizationsModel,
  OrgMembersModel,
];

@Global()
@Module({
  imports: [TypegooseModule.forFeature([OrganizationSchema, OrgMemberSchema])],
  providers: [...ModelProviders],
  exports: [...ModelProviders],
})
export class DbEntitiesModule {}
