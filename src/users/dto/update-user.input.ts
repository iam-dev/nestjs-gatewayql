import { CreateUserInput } from './create-user.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateUserInput extends PartialType(CreateUserInput) {
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
}
