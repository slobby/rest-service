import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  NotFoundException,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { ViewUserDto } from './dto/view-user.dto';

@Controller('/users/')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<ViewUserDto> {
    const res = await this.usersService.create(createUserDto);
    return User.toResponse(res);
  }

  @Get()
  async getAll(): Promise<Array<ViewUserDto>> {
    return (await this.usersService.getAll()).map((element) =>
      User.toResponse(element),
    );
  }

  @Get(':id')
  async getById(@Param('id') id: string): Promise<ViewUserDto> {
    const user = await this.usersService.getById(id);
    if (user) {
      return User.toResponse(user);
    }
    throw new NotFoundException();
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<ViewUserDto> {
    const user = await this.usersService.update(id, updateUserDto);
    if (user) {
      return User.toResponse(user);
    }
    throw new NotFoundException();
  }

  @Delete(':id')
  async deletById(@Param('id') id: string): Promise<ViewUserDto> {
    const user = await this.usersService.deletById(id);
    if (user) {
      return User.toResponse({ ...user, id });
    }
    throw new NotFoundException();
  }
}
