import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(
    username: string,
    password: string,
  ): Promise<{ access_token: string }> {
    const user = await this.usersService.findOneByName(username);
    if (user) {
      const isPasswordMatching = await bcrypt.compare(password, user.password);
      if (!isPasswordMatching) {
        throw new UnauthorizedException();
      }
      const payload = {
        sub: user.id,
      };
      return { access_token: await this.jwtService.sign(payload) };
    }
  }
}
