import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLGatewayModule } from '@nestjs/graphql';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SystemConfigModule } from './config/system-config.module';
import { GraphQLConfigService } from './config/graphql-config.service';
import gatewayConfiguration from './config/gateway.configuration';
import systemConfiguration from './config/system.configuration';
import { DatabaseConfig } from './config/databases/database.config';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

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
        autoSchemaFile: join(process.cwd(), 'generated/gateway.gql'),
        context: ({ req }) => ({ headers: req.headers }),
      }),
      imports: [SystemConfigModule],
      inject: [GraphQLConfigService],
    }),
    GraphQLModule.forRoot({
      debug: false,
      playground: true,
      autoSchemaFile: join(process.cwd(), 'generated/admin.gql'),
      sortSchema: true,
      path: 'admin',
      context: ({ req }) => ({ headers: req.headers }),
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: DatabaseConfig
    }),
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}