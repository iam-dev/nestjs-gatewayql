import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CredentialInput {
  @Field()
  id?: string;
  
  @Field()
  exampleField?: number;
  
  @Field()
  createdAt?: number

  @Field()
  updatedAt?: number
}
