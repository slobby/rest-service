import { Controller, Post, Body, ForbiddenException } from '@nestjs/common';
import { LoginService } from './login.service';
import { CreateLoginDto } from './dto/create-login.dto';
import { ViewLoginDto } from './dto/view-login.dto';

@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post()
  async create(@Body() createLoginDto: CreateLoginDto): Promise<ViewLoginDto> {
    const token: string | undefined = await this.loginService.create(
      createLoginDto,
    );
    if (token) {
      return { token };
    }
    throw new ForbiddenException();
  }
}
