import { UserRepo } from 'src/core/user/user.repo';
import { AuthService } from 'src/core/auth/auth.service';
import {
  applyDecorators,
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly auth: AuthService,
    private readonly userRepo: UserRepo,
  ) {}
  async canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();

    console.log('args by index', context.getArgByIndex(0).headers); // request
    console.log('get class', context.getClass().length);
    console.log('get handler', context.getHandler());

    const token = req.headers.token;

    if (!token) {
      throw new UnauthorizedException('no token no party');
    }
    const payload = this.auth.verifyToken(token);

    if (!payload) {
      throw new BadRequestException('no id pal');
    }

    const user = await this.userRepo.find(payload.id);

    if (!user) {
      throw new BadRequestException('no user pal');
    }

    return true;
  }
}

export function RequireAuth() {
  return applyDecorators(UseGuards(AuthGuard));
}
