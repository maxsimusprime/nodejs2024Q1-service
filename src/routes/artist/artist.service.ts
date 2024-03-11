import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from './entities/artist.entity';
import { UUID } from 'src/types/general';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class ArtistService {
  constructor(private readonly databaseService: DatabaseService) {}

  create(createArtistDto: CreateArtistDto): Artist {
    return this.databaseService.createArtist(createArtistDto);
  }

  findAll(): Artist[] {
    return this.databaseService.getAllArtists();
  }

  findOne(id: UUID): Artist {
    const artist = this.databaseService.getArtistById(id);
    if (!artist) throw new NotFoundException();
    return artist;
  }

  update(id: UUID, updateArtistDto: UpdateArtistDto): Artist {
    this.findOne(id);
    return this.databaseService.updateArtist(id, updateArtistDto);
  }

  remove(id: UUID) {
    const artist = this.findOne(id);
    if (artist) this.databaseService.deleteArtist(id);
  }
}
