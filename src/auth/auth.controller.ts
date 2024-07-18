import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from 'src/constant/constant';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @Public()
  @HttpCode(HttpStatus.OK)
  singIn(@Body() signIdDto: Record<string, any>) {
    return this.authService.signIn(signIdDto.username, signIdDto.password);
  }
}
