import { Injectable } from '@nestjs/common';
import { compareSync } from 'bcrypt';
import { UsersService } from 'src/users/users.service';


@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService){}

  async validateUser(email:string, pass: string): Promise<any>{

    const user = await this.usersService.findOne(email);

    const confirmPassword = user === null ? false: compareSync(user.password, pass);

    if(!confirmPassword) return null;

    const {  password, google, status, ...rest } = user;

    return { ...rest };
  }
}
