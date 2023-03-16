import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserEntity } from 'src/users/entities/user.entity';
import { CreateUserInput } from 'src/users/inputs/create-user.input';
import { UserService } from 'src/users/services/user/user.service';

@Resolver()
export class UserResolver {
    constructor(
        private readonly userService: UserService,
    ) {
    }

    @Mutation(() => UserEntity)
    async createUser(@Args('createUser') createUserInput: CreateUserInput): Promise<UserEntity> {
        return await this.userService.createUser(createUserInput);
    }

    @Query(() => UserEntity)
    async getOneUser(@Args('id') id: number): Promise<UserEntity> {
        return await this.userService.getOneUser(id);
    }

    @Query(() => [UserEntity])
    async getAllUser(): Promise<UserEntity[]> {
        return await this.userService.getAllUsers();
    }
}
