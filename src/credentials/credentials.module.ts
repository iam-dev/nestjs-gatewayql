import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CredentialsService } from './services/credentials.service';
import { CredentialsResolver } from './resolvers/credentials.resolver';
import { CredentialEntity } from './models/credential.entity';
@Module({
  imports: [
    TypeOrmModule.forFeature([CredentialEntity]),
  ],
  providers: [CredentialsResolver, CredentialsService]
})
export class CredentialsModule {}
