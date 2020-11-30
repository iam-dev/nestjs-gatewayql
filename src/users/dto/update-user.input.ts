import { CreateUserInput } from './create-user.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateUserInput extends PartialType(CreateUserInput) {
  @Field()
  id: string;
  
  @Field(type => String, { nullable: true })
  firstname: string;

  @Field(type => String, { nullable: true })
  lastname: string;

  @Field(type => String, { nullable: true })
  username: string;

  @Field(type => String, { nullable: true })
  email: string;

  @Field(type => String, { nullable: true })
  password: string;

  @Field(type => String, { nullable: true })
  redirectUri: string
}
