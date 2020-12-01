import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { UsersService } from './../services/users.service';
import { UserEntity } from '../models/user.entity';
import { User, UserRole } from '../models/user.interface';
import { CreateUserInput } from './../dto/create-user.input';
import { UpdateUserInput } from './../dto/update-user.input';
import { catchError, map } from 'rxjs/operators';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Roles } from '../../auth/decorators/roles.decorator';
import { UsersPipe } from '../pipes/users.pipe';

@Resolver(() => UserEntity)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(() => UserEntity)
  createUser(@Args('createUserInput', new UsersPipe()) createUserInput: CreateUserInput): Observable<User | Object> {
    return this.usersService.create(createUserInput).pipe(
      map((user: User) => user),
      catchError(err => of({ error: err.message }))
  );;
  }

  @Query(() => [UserEntity], { name: 'users' })
  getAllUsers() {
    return this.usersService.findAll();
  }

  @Query(() => UserEntity, { name: 'userById' })
  getUser(@Args('id', { type: () => String }) id: string) {
    return this.usersService.findOne(id);
  }

  @Query(() => UserEntity, { name: 'userByUsername' })
  getUserByUsername(@Args('username', { type: () => String }) username: string) {
    return this.usersService.findByUsername(username);
  }

  @Query(() => UserEntity, { name: 'userByEmail' })
  getUserByEmail(@Args('email', { type: () => String }) email: string) {
    return this.usersService.findByemail(email);
  }

  @Roles(UserRole.ADMIN)
  @UseGuards(RolesGuard)
  @Mutation(() => UserEntity)
  updateUser(@Args('updateUserInput', new UsersPipe()) updateUserInput: UpdateUserInput) {
    return this.usersService.updateOne(updateUserInput.id, updateUserInput);
  }

  @Roles(UserRole.ADMIN)
  @UseGuards(RolesGuard)
  @Mutation(() => UserEntity)
  removeUser(@Args('id', { type: () => String }) id: string) {
    return this.usersService.deleteOne(id);
  }
}
