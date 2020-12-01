import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class UserInput {
  @Field()
  id?: string;
  
  @Field()
  firstname?: string;

  @Field()
  lastname?: string;

  @Field()
  username?: string;

  @Field()
  email?: string;

  @Field()
  password?: string;

  @Field()
  redirectUri?: string

  @Field()
  createdAt?: number

  @Field()
  updatedAt?: number
}
