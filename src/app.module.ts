import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLGatewayModule } from '@nestjs/graphql';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CustomConfigModule } from './config/custom-config.module';
import { CustomConfigService } from './config/custom-config.service';
import configuration from './config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      ignoreEnvFile: true,
      load: [configuration],
    }),
    GraphQLGatewayModule.forRootAsync({
      useFactory: async (customConfigService: CustomConfigService) => ({
        ...customConfigService.createGatewayOptions(),
        autoSchemaFile: join(process.cwd(), 'generated/schema.gql'),
      }),
      imports: [CustomConfigModule],
      inject: [CustomConfigService],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
