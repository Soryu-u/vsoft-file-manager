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

    async createUser(userInput: CreateUserInput): Promise<UserEntity> {
        return await this.userRepository.save({...userInput})
    }

    async getOneUser(id: number): Promise<UserEntity> {
        return await this.userRepository.findOne({ where: {id} })
    }

    async getAllUsers(): Promise<UserEntity[]> {
        return await this.userRepository.find()
    }


}
