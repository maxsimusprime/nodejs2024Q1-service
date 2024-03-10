import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { UUID } from 'src/types/general';
import { DatabaseService } from 'src/database/database.service';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(private readonly databaseService: DatabaseService) {}
  create(createUserDto: CreateUserDto) {
    return this.databaseService.createUser(createUserDto);
  }

  findAll(): User[] {
    return this.databaseService.getAllUsers();
  }

  findOne(id: UUID): User {
    const user = this.databaseService.getUserById(id);
    if (!user) throw new NotFoundException();
    return user;
  }

  update(id: UUID, updatePasswordDto: UpdatePasswordDto): User {
    const user = this.findOne(id);
    if (user.password !== updatePasswordDto.oldPassword)
      throw new ForbiddenException();
    return this.databaseService.updateUser(id, updatePasswordDto);
  }

  remove(id: UUID) {
    const user = this.findOne(id);
    if (user) this.databaseService.deleteUser(id);
  }
}
