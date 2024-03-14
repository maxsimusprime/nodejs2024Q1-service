import { Injectable } from '@nestjs/common';
import { CreateAlbumDto } from 'src/routes/album/dto/create-album.dto';
import { UpdateAlbumDto } from 'src/routes/album/dto/update-album.dto';
import { Album } from 'src/routes/album/entities/album.entity';
import { CreateArtistDto } from 'src/routes/artist/dto/create-artist.dto';
import { UpdateArtistDto } from 'src/routes/artist/dto/update-artist.dto';
import { Artist } from 'src/routes/artist/entities/artist.entity';
import {
  Favorites,
  FavoritesResponse,
} from 'src/routes/favs/entities/fav.entity';
import { CreateTrackDto } from 'src/routes/track/dto/create-track.dto';
import { UpdateTrackDto } from 'src/routes/track/dto/update-track.dto';
import { Track } from 'src/routes/track/entities/track.entity';
import { CreateUserDto } from 'src/routes/user/dto/create-user.dto';
import { User } from 'src/routes/user/entities/user.entity';
import { UUID } from 'src/types/general';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class DatabaseService {
  private users: User[] = [];
  private tracks: Track[] = [];
  private artists: Artist[] = [];
  private albums: Album[] = [];
  private favorites: Favorites = {
    artists: [],
    albums: [],
    tracks: [],
  };

  private prisma: PrismaClient = new PrismaClient();

  // Users
  public async getAllUsers(): Promise<User[]> {
    return await this.prisma.user.findMany();
  }

  public async getUserById(id: UUID): Promise<User> {
    return await this.prisma.user.findUnique({
      where: { id },
    });
  }

  public async createUser(dto: CreateUserDto): Promise<User> {
    return await this.prisma.user.create({
      data: {
        ...dto,
      },
    });
  }

  public async updateUser(id: UUID, password: string): Promise<User> {
    return await this.prisma.user.update({
      where: { id },
      data: {
        password,
      },
    });
  }

  public async deleteUser(id: UUID): Promise<void> {
    await this.prisma.user.delete({
      where: { id },
    });
  }

  // Tracks
  public async getAllTracks(): Promise<Track[]> {
    return await this.prisma.track.findMany();
  }

  public async getTrackById(id: UUID): Promise<Track> {
    return await this.prisma.track.findUnique({
      where: { id },
    });
  }

  public async createTrack(dto: CreateTrackDto): Promise<Track> {
    const { name, duration, artistId, albumId } = dto;
    return await this.prisma.track.create({
      data: {
        name,
        duration,
        ...(artistId && {
          artist: {
            connect: {
              id: artistId,
            },
          },
        }),
        ...(albumId && {
          album: {
            connect: {
              id: albumId,
            },
          },
        }),
      },
    });
  }

  public async updateTrack(id: UUID, dto: UpdateTrackDto): Promise<Track> {
    return await this.prisma.track.update({
      where: { id },
      data: {
        ...dto,
      },
    });
  }

  public async deleteTrack(id: UUID): Promise<void> {
    await this.prisma.track.delete({
      where: { id },
    });
  }

  // Artist
  public async getAllArtists(): Promise<Artist[]> {
    return await this.prisma.artist.findMany();
  }

  public async getArtistById(id: UUID): Promise<Artist> {
    return await this.prisma.artist.findUnique({
      where: { id },
    });
  }

  public async createArtist(dto: CreateArtistDto): Promise<Artist> {
    return this.prisma.artist.create({
      data: {
        ...dto,
      },
    });
  }

  public async updateArtist(id: UUID, dto: UpdateArtistDto): Promise<Artist> {
    return this.prisma.artist.update({
      where: {
        id,
      },
      data: {
        ...dto,
      },
    });
  }

  public async deleteArtist(id: UUID): Promise<void> {
    await this.prisma.artist.delete({
      where: {
        id,
      },
    });
  }

  //Album
  public async getAllAlbums(): Promise<Album[]> {
    return this.prisma.album.findMany();
  }

  public async getAlbumById(id: UUID): Promise<Album> {
    return this.prisma.album.findUnique({
      where: { id },
    });
  }

  public async createAlbum(dto: CreateAlbumDto): Promise<Album> {
    const { name, year, artistId } = dto;
    return this.prisma.album.create({
      data: {
        name,
        year,
        ...(artistId && {
          artist: {
            connect: {
              id: artistId,
            },
          },
        }),
      },
    });
  }

  public async updateAlbum(id: UUID, dto: UpdateAlbumDto): Promise<Album> {
    return this.prisma.album.update({
      where: { id },
      data: {
        ...dto,
      },
    });
  }

  public async deleteAlbum(id: UUID): Promise<void> {
    await this.prisma.album.delete({
      where: { id },
    });
  }

  // Favorites
  public getAllFavorites(): FavoritesResponse {
    return {
      // artists: this.favorites.artists.map((id) => this.getArtistById(id)),
      artists: [],

      // albums: this.favorites.albums.map((id) => this.getAlbumById(id)),
      albums: [],

      // tracks: this.favorites.tracks.map((id) => this.getTrackById(id)),
      tracks: [],
    };
  }

  public addTrackToFavorites(id: UUID) {
    this.favorites.tracks.push(id);
  }

  public addAlbumToFavorites(id: UUID) {
    this.favorites.albums.push(id);
  }

  public addArtistToFavorites(id: UUID) {
    this.favorites.artists.push(id);
  }

  public removeTrackFromFavorites(id: UUID) {
    this.favorites.tracks = this.favorites.tracks.filter(
      (trackId) => trackId !== id,
    );
  }

  public removeAlbumFromFavorites(id: UUID) {
    this.favorites.albums = this.favorites.albums.filter(
      (albumId) => albumId !== id,
    );
  }

  public removeArtistFromFavorites(id: UUID) {
    this.favorites.artists = this.favorites.artists.filter(
      (artistId) => artistId !== id,
    );
  }
}
