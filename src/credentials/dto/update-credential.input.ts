import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { CredentialInput } from './credential.input';

@InputType()
export class UpdateCredentialInput extends PartialType(CredentialInput) {
  @Field()
  id?: string;
  
  @Field()
  exampleField?: number;
}
