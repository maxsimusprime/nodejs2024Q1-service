import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './entities/album.entity';
import { DatabaseService } from 'src/database/database.service';
import { UUID } from 'src/types/general';

@Injectable()
export class AlbumService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createAlbumDto: CreateAlbumDto): Promise<Album> {
    try {
      return await this.databaseService.createAlbum(createAlbumDto);
    } catch {
      throw new BadRequestException();
    }
  }

  async findAll(): Promise<Album[]> {
    return await this.databaseService.getAllAlbums();
  }

  async findOne(id: UUID): Promise<Album> {
    const album = await this.databaseService.getAlbumById(id);
    if (!album) throw new NotFoundException();
    return album;
  }

  async update(id: UUID, updateAlbumDto: UpdateAlbumDto): Promise<Album> {
    await this.findOne(id);
    try {
      return await this.databaseService.updateAlbum(id, updateAlbumDto);
    } catch {
      throw new BadRequestException();
    }
  }

  async remove(id: UUID): Promise<void> {
    const album = await this.findOne(id);
    if (album) await this.databaseService.deleteAlbum(id);
  }
}
