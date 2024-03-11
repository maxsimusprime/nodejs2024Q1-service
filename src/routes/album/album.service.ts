import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './entities/album.entity';
import { DatabaseService } from 'src/database/database.service';
import { UUID } from 'src/types/general';

@Injectable()
export class AlbumService {
  constructor(private readonly databaseService: DatabaseService) {}

  create(createAlbumDto: CreateAlbumDto): Album {
    return this.databaseService.createAlbum(createAlbumDto);
  }

  findAll(): Album[] {
    return this.databaseService.getAllAlbums();
  }

  findOne(id: UUID): Album {
    const album = this.databaseService.getAlbumById(id);
    if (!album) throw new NotFoundException();
    return album;
  }

  update(id: UUID, updateAlbumDto: UpdateAlbumDto): Album {
    this.findOne(id);
    return this.databaseService.updateAlbum(id, updateAlbumDto);
  }

  remove(id: UUID) {
    const album = this.findOne(id);
    if (album) this.databaseService.deleteAlbum(id);
  }
}
