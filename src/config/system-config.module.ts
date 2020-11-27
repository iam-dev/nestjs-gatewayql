import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config'
import { GraphQLConfigService } from './graphql-config.service';

@Module({
  imports: [ConfigModule],
  providers: [GraphQLConfigService],
  exports: [GraphQLConfigService],
})
export class SystemConfigModule {}
