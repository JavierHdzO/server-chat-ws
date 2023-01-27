import { applyDecorators, SetMetadata, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Role } from "../enum/roles.enum";
import { RolesGuard } from "../guards/roles.guard";

export function Auth(...roles: Role[]){

    return applyDecorators(
        SetMetadata('roles', roles),
        UseGuards( AuthGuard('jwt'), RolesGuard )
    );
}