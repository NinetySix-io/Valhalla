import { Global, Module, ModuleMetadata } from '@nestjs/common';

import { KindagooseModule } from 'kindagoose';
import { OrgMemberSchema } from './org.members/schema';
import { OrgMembersModel } from './org.members';
import { OrganizationSchema } from './organizations/schema';
import { OrganizationsModel } from './organizations';

const ModelProviders: ModuleMetadata['providers'] = [
  OrganizationsModel,
  OrgMembersModel,
];

@Global()
@Module({
  imports: [KindagooseModule.forFeature([OrganizationSchema, OrgMemberSchema])],
  providers: [...ModelProviders],
  exports: [...ModelProviders],
})
export class DbEntitiesModule {}
