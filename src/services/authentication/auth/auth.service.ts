import { Strategy } from "passport-local";
import { PassportStrategy} from '@nestjs/passport';
import { HttpException,HttpStatus, Injectable, UnauthorizedException } from "@nestjs/common";
import { UsersService } from "../../users/users.service";
import { JwtService } from "@nestjs/jwt";
@Injectable()
export class AuthService extends PassportStrategy(Strategy) {
    constructor(private userService: UsersService,
                private jwtServuce: JwtService
    ) {
        super({usernameField:'login', passwordField:'psw'});
    }


async validate(login:string,password:string): Promise<any>{
    const user = await this.userService.checkAuthUser(login,password);
    console.log('user',user)
    if (!user) {
        throw new HttpException({
            status:HttpStatus.CONFLICT,
            errorText:' Пользователь не найден в базе ',
    },HttpStatus.CONFLICT);
    }
    return true;
}

}

