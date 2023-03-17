import {Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {UserEntity} from "../../entities/user.entity";
import {Repository} from "typeorm";
import {CreateUserInput} from "../../inputs/create-user.input";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>
    ) {
    }

    async createUser(email: string): Promise<UserEntity> {
        const checkedUser = await this.userRepository.findOne({ where: {email} });
        const user = new UserEntity();
        user.email = email;
        if (checkedUser) {
            return checkedUser
        } else {
            return this.userRepository.save(user);
        }
    }

    async getOneUser(id: number): Promise<UserEntity> {
        return await this.userRepository.findOne({ where: {id} })
    }

    async getAllUsers(): Promise<UserEntity[]> {
        return await this.userRepository.find()
    }


}
