import { IsString, IsEmail, IsAlphanumeric, MinLength } from 'class-validator';

export class CreateUserDto {

    @IsString()
    @MinLength(5)
    name:string;

    @IsString()
    @IsEmail()
    @MinLength(4)
    email: string;

    @IsString()
    @IsAlphanumeric()
    @MinLength(8)
    password:string;

}
