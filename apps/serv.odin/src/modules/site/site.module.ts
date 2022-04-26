import { Module } from '@nestjs/common';
import { SiteResolver } from './site.resolver';
import { SiteSchema } from '@serv.odin/data.models/sites/schema';
import { SitesModel } from '@serv.odin/data.models/sites';
import { TypegooseModule } from 'nestjs-typegoose';

@Module({
  imports: [TypegooseModule.forFeature([SiteSchema])],
  providers: [SitesModel, SiteResolver],
})
export class SiteModule {}
