import { Injectable, NotFoundException } from '@nestjs/common';
import { users } from 'src/mockData';
import { CreateUserDto } from 'src/routes/user/dto/create-user.dto';
import { UpdatePasswordDto } from 'src/routes/user/dto/update-password.dto';
import { User } from 'src/routes/user/entities/user.entity';
import { UUID } from 'src/types/general';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class DatabaseService {
  private users: User[] = [];

  constructor() {
    this.users = users;
  }

  public getAllUsers(): User[] {
    return this.users;
  }

  public getUserById(id: UUID): User {
    const user = this.users.find((user) => user.id === id);
    if (!user)
      throw new NotFoundException('User with provided id is not found');
    return user;
  }

  public createUser(dto: CreateUserDto): User {
    const timeNow = Date.now();
    const user: User = {
      ...dto,
      id: uuidv4(),
      version: 0,
      createdAt: timeNow,
      updatedAt: timeNow,
    };
    this.users.push(user);
    return user;
  }

  public updateUser(id: UUID, dto: UpdatePasswordDto) {
    const user = this.users.find((user) => user.id === id);
    const updatedUser = {
      ...user,
      password: dto.newPassword,
      updatedAt: Date.now(),
    };

    this.users = this.users.map((user) =>
      user.id !== id ? user : updatedUser,
    );
    return updatedUser;
  }

  public deleteUser(id: UUID) {
    this.users = this.users.filter((user) => user.id !== id);
  }
}
