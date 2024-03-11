import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { UUID } from 'src/types/general';
import { DatabaseService } from 'src/database/database.service';
import { User, UserResponse } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(private readonly databaseService: DatabaseService) {}
  create(createUserDto: CreateUserDto): UserResponse {
    const user = this.databaseService.createUser(createUserDto);
    return this.createUserResponse(user);
  }

  findAll(): UserResponse[] {
    const users = this.databaseService.getAllUsers();
    return users.map((user) => this.createUserResponse(user));
  }

  findOne(id: UUID): UserResponse {
    const user = this.databaseService.getUserById(id);
    if (!user) throw new NotFoundException();
    return this.createUserResponse(user);
  }

  update(id: UUID, updatePasswordDto: UpdatePasswordDto): UserResponse {
    const user = this.databaseService.getUserById(id);
    if (!user) throw new NotFoundException();
    if (user.password !== updatePasswordDto.oldPassword)
      throw new ForbiddenException();
    const updatedUser = this.databaseService.updateUser(id, updatePasswordDto);
    return this.createUserResponse(updatedUser);
  }

  remove(id: UUID) {
    const user = this.databaseService.getUserById(id);
    if (!user) throw new NotFoundException();
    this.databaseService.deleteUser(id);
  }

  private createUserResponse(user: User): UserResponse {
    const userResponse = { ...user };
    delete userResponse['password'];
    return userResponse;
  }
}
