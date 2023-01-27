import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ConfigService } from '@nestjs/config';
import { Strategy, ExtractJwt }  from "passport-jwt";
import { JwtPayload } from "../interfaces/jwt-payload.interface";
import { UsersService } from "src/users/users.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){

    constructor( 
        private readonly configService: ConfigService,
        private readonly usersService: UsersService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.getOrThrow("SECRET_KEY_JWT")
        });
    }

    async validate(payload: JwtPayload){
        const { id  } = payload;

        const user = await this.usersService.findOne( id );

        if(!user || !user.status) throw new UnauthorizedException('Token missing or incorrect');

        return user;

    }
}