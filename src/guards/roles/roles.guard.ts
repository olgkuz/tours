import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { IUser } from 'src/interfaces/user';
import { jwtConstant } from 'src/static/private/constants';
import { Request } from 'express';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException('Token is missing or invalid');
    }

    const userPayload = await this.jwtService.verifyAsync<IUser>(token, {
      secret: jwtConstant.secret,
    });

    console.log('Token:', token);
    console.log('User from JWT:', userPayload);

    return userPayload?.role === 'admin';
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const authHeader = request.headers.authorization;
    if (!authHeader) return undefined;

    const [type, token] = authHeader.split(' '); 
    return type === 'Bearer' ? token : undefined;
  }
}

