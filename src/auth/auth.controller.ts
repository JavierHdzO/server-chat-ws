import { Controller, Get, Post, Body, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { User } from './decorators/user.decorator';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('signin')
  async singin( @User() user){
    return this.authService.login(user);
  }

  @UseGuards( JwtAuthGuard )
  @Get('refresh')
  async refreshToken(@User('id') id){
    return this.authService.refresh(id);
  }
  
}
