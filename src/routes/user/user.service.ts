import {
  BadRequestException,
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

  async create(createUserDto: CreateUserDto): Promise<UserResponse> {
    try {
      const user = await this.databaseService.createUser(createUserDto);
      return this.createUserResponse(user);
    } catch {
      throw new BadRequestException();
    }
  }

  async findAll(): Promise<UserResponse[]> {
    const users = await this.databaseService.getAllUsers();
    return users.map((user) => this.createUserResponse(user));
  }

  async findOne(id: UUID): Promise<UserResponse> {
    const user = await this.databaseService.getUserById(id);
    if (!user) throw new NotFoundException();
    return this.createUserResponse(user);
  }

  async update(
    id: UUID,
    updatePasswordDto: UpdatePasswordDto,
  ): Promise<UserResponse> {
    const user = await this.databaseService.getUserById(id);
    if (!user) throw new NotFoundException();

    const { newPassword, oldPassword } = updatePasswordDto;
    if (user.password !== oldPassword) throw new ForbiddenException();

    try {
      const updatedUser = await this.databaseService.updateUser(
        id,
        newPassword,
      );
      return this.createUserResponse(updatedUser);
    } catch {
      throw new BadRequestException();
    }
  }

  async remove(id: UUID) {
    const user = await this.databaseService.getUserById(id);
    if (!user) throw new NotFoundException();
    this.databaseService.deleteUser(id);
  }

  private createUserResponse(user: User): UserResponse {
    const userResponse = { ...user };
    delete userResponse['password'];
    return userResponse;
  }
}
