import { Injectable } from '@nestjs/common';
import { compareSync } from 'bcrypt';
import { UsersService } from 'src/users/users.service';
import { UserConstrain } from 'src/users/interfaces/user.interface';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/entities';


@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService){}

  async validateUser(email:string, pass: string):Promise<UserConstrain> {
    const user = await this.usersService.findOne(email);
    const confirmPassword = user === null ? false: compareSync(pass, user.password);

    if(!confirmPassword) return null;

    const {  password, google, status, ...rest } = user;
    return { ...rest };
  }

  async login(user: UserConstrain){
    const payload = { id:user.id };

    return {
      user,
      access_token:this.jwtService.sign(payload)
    }

  }

  refresh(user:User){
    const token = this.jwtService.sign({ id:user.id });
    return{
      user:user,
      refresh_access_token: token
    }
  }
}
