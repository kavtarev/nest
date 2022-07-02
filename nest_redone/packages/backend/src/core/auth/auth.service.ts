import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  issueToken(id: number) {
    const token = this.jwtService.sign({ id }); // must be an object
    return token;
  }

  verifyToken(token: string) {
    try {
      const res = this.jwtService.verify(token);
      return res;
    } catch (error) {
      throw new BadRequestException('psina');
    }
  }
}
