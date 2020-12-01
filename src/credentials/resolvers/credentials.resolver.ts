import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CredentialsService } from '../services/credentials.service';
import { CredentialEntity } from '../models/credential.entity';
import { CreateCredentialInput } from '../dto/create-credential.input';
import { UpdateCredentialInput } from '../dto/update-credential.input';

@Resolver(() => CredentialEntity)
export class CredentialsResolver {
  constructor(private readonly credentialsService: CredentialsService) {}

  @Mutation(() => CredentialEntity)
  createCredential(@Args('createCredentialInput') createCredentialInput: CreateCredentialInput) {
    return this.credentialsService.create(createCredentialInput);
  }

  @Query(() => [CredentialEntity], { name: 'credentials' })
  findAll() {
    return this.credentialsService.findAll();
  }

  @Query(() => CredentialEntity, { name: 'credential' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.credentialsService.findOne(id);
  }

  @Mutation(() => CredentialEntity)
  updateCredential(@Args('updateCredentialInput') updateCredentialInput: UpdateCredentialInput) {
    return this.credentialsService.update(updateCredentialInput.id, updateCredentialInput);
  }

  @Mutation(() => CredentialEntity)
  removeCredential(@Args('id', { type: () => String }) id: string) {
    return this.credentialsService.remove(id);
  }
}
