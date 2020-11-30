import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { UserEntity } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Resolver(() => UserEntity)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(() => UserEntity)
  createUser(@Args('createUserInput') createUserInput: CreateUserInput): Observable<UserEntity | Object> {
    return this.usersService.create(createUserInput).pipe(
      map((user: CreateUserInput) => user),
      catchError(err => of({ error: err.message }))
  );;
  }

  @Query(() => [UserEntity], { name: 'users' })
  getAllUsers() {
    return this.usersService.findAll();
  }

  @Query(() => UserEntity, { name: 'user' })
  getUser(@Args('id', { type: () => Int }) id: string) {
    return this.usersService.findOne(id);
  }

  @Mutation(() => UserEntity)
  updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    return this.usersService.updateOne(updateUserInput.id, updateUserInput);
  }

  @Mutation(() => UserEntity)
  removeUser(@Args('id', { type: () => Int }) id: string) {
    return this.usersService.deleteOne(id);
  }
}
