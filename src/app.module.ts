import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLGatewayModule } from '@nestjs/graphql';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SystemConfigModule } from './config/system-config.module';
import { GraphQLConfigService } from './config/graphql-config.service';
import gatewayConfiguration from './config/gateway.configuration';
import systemConfiguration from './config/system.configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      ignoreEnvFile: true,
      load: [gatewayConfiguration, systemConfiguration],
    }),
    GraphQLGatewayModule.forRootAsync({
      useFactory: async (graphQLConfigService: GraphQLConfigService) => ({
        ...graphQLConfigService.createGatewayOptions(),
        autoSchemaFile: join(process.cwd(), 'generated/schema.gql'),
      }),
      imports: [SystemConfigModule],
      inject: [GraphQLConfigService],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}