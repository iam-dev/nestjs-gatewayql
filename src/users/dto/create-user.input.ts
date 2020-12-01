import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
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
