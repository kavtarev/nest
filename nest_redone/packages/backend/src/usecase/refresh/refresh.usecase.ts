import { Injectable } from '@nestjs/common';
import { AuthService } from 'src/core/auth/auth.service';
import { TokenRepository } from 'src/core/token/token.repository';

@Injectable()
export class RefreshUsecase {
  constructor(
    private readonly tokenRepo: TokenRepository,
    private readonly auth: AuthService,
  ) {}

  async execute(id: string) {
    const token = await this.tokenRepo.getOne(id);

    if (!token) {
      return null;
    }

    const userId = token.userId;

    await this.tokenRepo.deleteOne(token);
    const newToken = this.auth.issueToken(userId);
    const res = await this.tokenRepo.save({
      userId,
    });

    return { accessToken: newToken, refreshToken: res.id };
  }
}
