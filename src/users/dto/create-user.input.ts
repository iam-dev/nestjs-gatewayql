import { InputType, Field, PartialType } from '@nestjs/graphql';
import { UserInput } from './users.input';

@InputType()
export class CreateUserInput extends PartialType(UserInput) {
  @Field()
  firstname?: string;

  @Field()
  lastname?: string;

  @Field()
  username?: string;

  @Field()
  email: string;

  @Field()
  password: string;

  @Field()
  redirectUri?: string
}
