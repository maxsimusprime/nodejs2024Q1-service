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

  findAll(): FavoritesResponse {
    return this.databaseService.getAllFavorites();
  }

  addTrack(id: UUID) {
    const track = this.databaseService.getTrackById(id);
    if (!track) throw new UnprocessableEntityException();
    this.databaseService.addTrackToFavorites(id);
    return {
      message: `Track with id ${id} was added to favorites`,
    };
  }

  addAlbum(id: UUID) {
    const album = this.databaseService.getAlbumById(id);
    if (!album) throw new UnprocessableEntityException();
    this.databaseService.addAlbumToFavorites(id);
    return {
      message: `Album with id ${id} was added to favorites`,
    };
  }

  addArtist(id: UUID) {
    const artist = this.databaseService.getArtistById(id);
    if (!artist) throw new UnprocessableEntityException();
    this.databaseService.addArtistToFavorites(id);
    return {
      message: `Artist with id ${id} was added to favorites`,
    };
  }

  removeTrack(id: UUID) {
    const track = this.databaseService.getTrackById(id);
    if (!track) throw new NotFoundException();
    this.databaseService.removeTrackFromFavorites(id);
  }

  removeAlbum(id: UUID) {
    const album = this.databaseService.getAlbumById(id);
    if (!album) throw new NotFoundException();
    this.databaseService.removeAlbumFromFavorites(id);
  }

  removeArtist(id: UUID) {
    const artist = this.databaseService.getArtistById(id);
    if (!artist) throw new NotFoundException();
    this.databaseService.removeArtistFromFavorites(id);
  }
}
