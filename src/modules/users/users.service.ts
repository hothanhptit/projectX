import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  // constructor(
  //   @InjectRepository(User)
  //   private readonly usersRepository: Repository<User>,
  // ) {}
  // async create(createUser: User) {
  //   const user = new User();
  //   user.firstName = createUser.firstName;
  //   user.lastName = createUser.lastName;
  //   // const newUser = await this.usersRepository.save(user);
  //   // return this.usersRepository.save(user);
  //   // return newUser
  //   return user
  // }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  // update(id: number, updateUserInput: UpdateUserInput) {
  //   return `This action updates a #${id} user`;
  // }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
