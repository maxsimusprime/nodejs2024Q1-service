import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { FavoritesResponse } from './entities/fav.entity';
import { UUID } from 'src/types/general';

@Injectable()
export class FavsService {
  constructor(private readonly databaseService: DatabaseService) {}

  async findAll(): Promise<FavoritesResponse> {
    return await this.databaseService.getAllFavorites();
  }

  async addTrack(id: UUID) {
    const track = await this.databaseService.getTrackById(id);
    if (!track) throw new UnprocessableEntityException();
    await this.databaseService.addTrackToFavorites(id);
    return {
      message: `Track with id ${id} was added to favorites`,
    };
  }

  async addAlbum(id: UUID) {
    const album = await this.databaseService.getAlbumById(id);
    if (!album) throw new UnprocessableEntityException();
    await this.databaseService.addAlbumToFavorites(id);
    return {
      message: `Album with id ${id} was added to favorites`,
    };
  }

  async addArtist(id: UUID) {
    const artist = await this.databaseService.getArtistById(id);
    if (!artist) throw new UnprocessableEntityException();
    await this.databaseService.addArtistToFavorites(id);
    return {
      message: `Artist with id ${id} was added to favorites`,
    };
  }

  async removeTrack(id: UUID): Promise<void> {
    const track = await this.databaseService.getTrackById(id);
    if (!track) throw new NotFoundException();
    await this.databaseService.removeTrackFromFavorites(id);
  }

  async removeAlbum(id: UUID): Promise<void> {
    const album = await this.databaseService.getAlbumById(id);
    if (!album) throw new NotFoundException();
    await this.databaseService.removeAlbumFromFavorites(id);
  }

  async removeArtist(id: UUID): Promise<void> {
    const artist = await this.databaseService.getArtistById(id);
    if (!artist) throw new NotFoundException();
    await this.databaseService.removeArtistFromFavorites(id);
  }
}
