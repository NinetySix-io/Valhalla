import { AccountSettingSchema } from './account.settings/schema';
import { AccountSettingsModel } from './account.settings';
import { Global } from '@nestjs/common';
import { Module } from '@nestjs/common';
import { ModuleMetadata } from '@nestjs/common';
import { OrgMemberSchema } from './org.members/schema';
import { OrgMembersModel } from './org.members';
import { OrganizationSchema } from './organizations/schema';
import { OrganizationsModel } from './organizations';
import { TypegooseModule } from 'nestjs-typegoose';

const ModelProviders: ModuleMetadata['providers'] = [
  OrganizationsModel,
  OrgMembersModel,
  AccountSettingsModel,
];

@Global()
@Module({
  imports: [
    TypegooseModule.forFeature([
      OrganizationSchema,
      OrgMemberSchema,
      AccountSettingSchema,
    ]),
  ],
  providers: [...ModelProviders],
  exports: [...ModelProviders],
})
export class DbEntitiesModule {}
