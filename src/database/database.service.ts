import { Injectable } from '@nestjs/common';
import { CreateAlbumDto } from 'src/routes/album/dto/create-album.dto';
import { UpdateAlbumDto } from 'src/routes/album/dto/update-album.dto';
import { Album } from 'src/routes/album/entities/album.entity';
import { CreateArtistDto } from 'src/routes/artist/dto/create-artist.dto';
import { UpdateArtistDto } from 'src/routes/artist/dto/update-artist.dto';
import { Artist } from 'src/routes/artist/entities/artist.entity';
import { CreateTrackDto } from 'src/routes/track/dto/create-track.dto';
import { UpdateTrackDto } from 'src/routes/track/dto/update-track.dto';
import { Track } from 'src/routes/track/entities/track.entity';
import { CreateUserDto } from 'src/routes/user/dto/create-user.dto';
import { UpdatePasswordDto } from 'src/routes/user/dto/update-password.dto';
import { User } from 'src/routes/user/entities/user.entity';
import { UUID } from 'src/types/general';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class DatabaseService {
  private users: User[] = [];
  private tracks: Track[] = [];
  private artists: Artist[] = [];
  private albums: Album[] = [];

  // Users
  public getAllUsers(): User[] {
    return this.users;
  }

  public getUserById(id: UUID): User {
    return this.users.find((user) => user.id === id);
  }

  public createUser(dto: CreateUserDto): User {
    const timeNow = Date.now();
    const user: User = {
      ...dto,
      id: uuidv4(),
      version: 0,
      createdAt: timeNow,
      updatedAt: timeNow,
    };
    this.users.push(user);
    return user;
  }

  public updateUser(id: UUID, dto: UpdatePasswordDto) {
    const user = this.users.find((user) => user.id === id);
    const updatedUser = {
      ...user,
      password: dto.newPassword,
      updatedAt: Date.now(),
    };

    this.users = this.users.map((user) =>
      user.id !== id ? user : updatedUser,
    );
    return updatedUser;
  }

  public deleteUser(id: UUID) {
    this.users = this.users.filter((user) => user.id !== id);
  }

  // Tracks
  public getAllTracks() {
    return this.tracks;
  }

  public getTrackById(id: UUID) {
    return this.tracks.find((track) => track.id === id);
  }

  public createTrack(dto: CreateTrackDto): Track {
    const { name, duration, artistId, albumId } = dto;
    const track: Track = {
      id: uuidv4(),
      name,
      duration,
      artistId: artistId || null,
      albumId: albumId || null,
    };
    this.tracks.push(track);
    return track;
  }

  public updateTrack(id: UUID, dto: UpdateTrackDto): Track {
    const track = this.getTrackById(id);
    const updatedTrack = {
      ...track,
      ...dto,
    };
    this.tracks = this.tracks.map((track) =>
      track.id !== id ? track : updatedTrack,
    );
    return updatedTrack;
  }

  public deleteTrack(id: UUID) {
    this.tracks = this.tracks.filter((track) => track.id !== id);
  }

  // Artist
  public getAllArtists(): Artist[] {
    return this.artists;
  }

  public getArtistById(id: UUID): Artist {
    return this.artists.find((artist) => artist.id === id);
  }

  public createArtist(dto: CreateArtistDto): Artist {
    const artist = {
      id: uuidv4(),
      ...dto,
    };
    this.artists.push(artist);
    return artist;
  }

  public updateArtist(id: UUID, dto: UpdateArtistDto): Artist {
    const artist = this.getArtistById(id);
    const updatedArtist = {
      ...artist,
      ...dto,
    };
    this.artists = this.artists.map((artist) =>
      artist.id !== id ? artist : updatedArtist,
    );
    return updatedArtist;
  }

  public deleteArtist(id: UUID) {
    this.artists = this.artists.filter((artist) => artist.id !== id);
  }

  //Album
  public getAllAlbums(): Album[] {
    return this.albums;
  }

  public getAlbumById(id: UUID): Album {
    return this.albums.find((album) => album.id === id);
  }

  public createAlbum(dto: CreateAlbumDto): Album {
    const newAlbum: Album = {
      id: uuidv4(),
      ...dto,
    };
    this.albums.push(newAlbum);
    return newAlbum;
  }

  public updateAlbum(id: UUID, dto: UpdateAlbumDto): Album {
    const album = this.getAlbumById(id);
    const updatedAlbum = {
      ...album,
      ...dto,
    };
    this.albums = this.albums.map((album) =>
      album.id !== id ? album : updatedAlbum,
    );
    return updatedAlbum;
  }

  public deleteAlbum(id: UUID) {
    this.albums = this.albums.filter((album) => album.id !== id);
  }
}
