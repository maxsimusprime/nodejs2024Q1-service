import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from './entities/artist.entity';
import { UUID } from 'src/types/general';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class ArtistService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createArtistDto: CreateArtistDto): Promise<Artist> {
    return await this.databaseService.createArtist(createArtistDto);
  }

  async findAll(): Promise<Artist[]> {
    return await this.databaseService.getAllArtists();
  }

  async findOne(id: UUID): Promise<Artist> {
    const artist = await this.databaseService.getArtistById(id);
    if (!artist) throw new NotFoundException();
    return artist;
  }

  async update(id: UUID, updateArtistDto: UpdateArtistDto): Promise<Artist> {
    await this.findOne(id);
    return await this.databaseService.updateArtist(id, updateArtistDto);
  }

  async remove(id: UUID) {
    const artist = await this.findOne(id);
    if (artist) this.databaseService.deleteArtist(id);
  }
}
