import { InputType, Int, Field, PartialType } from '@nestjs/graphql';
import { CredentialInput } from './credential.input';

@InputType()
export class CreateCredentialInput extends PartialType(CredentialInput) {
  @Field()
  exampleField?: number;
}
