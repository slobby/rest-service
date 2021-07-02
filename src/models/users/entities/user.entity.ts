import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ViewUserDto } from '../dto/view-user.dto';
import { IUser } from '../interfaces/IUser';

@Entity({
  name: 'User',
})
export class User implements IUser {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    length: 50,
  })
  name: string;

  @Column({
    type: 'varchar',
    length: 50,
  })
  login: string;

  @Column({
    type: 'varchar',
    length: 60,
  })
  password: string;

  static toResponse(user: User): ViewUserDto {
    const { password, ...viewUserDto } = user;
    return viewUserDto;
  }
}
