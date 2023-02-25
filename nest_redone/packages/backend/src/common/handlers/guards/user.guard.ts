import {
  applyDecorators,
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from 'src/core/auth/auth.service';
import { UserRepository } from 'src/core/user/user.repo';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly auth: AuthService,
    private readonly userRepo: UserRepository,
  ) {}
  async canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();

    const token = req.headers.token;

    if (!token) {
      throw new UnauthorizedException('no token no party');
    }
    const payload = this.auth.verifyToken(token);

    if (!payload) {
      throw new BadRequestException('no id pal');
    }

    if (payload.error) {
      return false;
    }

    const user = await this.userRepo.find(payload.payload.id);

    if (!user) {
      throw new BadRequestException('no user pal');
    }

    req.user = user;

    return true;
  }
}

export function RequireAuth() {
  return applyDecorators(UseGuards(AuthGuard));
}
