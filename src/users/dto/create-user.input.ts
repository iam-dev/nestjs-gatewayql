import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
  @Field(type => String, { nullable: true })
  firstname?: string;

  @Field(type => String, { nullable: true })
  lastname?: string;

  @Field()
  username?: string;

  @Field()
  email?: string;

  @Field()
  password?: string;

  @Field(type => String, { nullable: true })
  redirectUri?: string
}
