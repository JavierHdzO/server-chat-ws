import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  create(createUserDto: CreateUserDto) {
    return {message:'This action adds a new user'};
  }

  findAll() {
    return {message:`This action returns all users`};
  }

  findOne(id: number) {
    return {message:`This action returns a #${id} user`};
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return {message:`This action updates a #${id} user`};
  }

  remove(id: number) {
    return {message:`This action removes a #${id} user`};
  }
}
