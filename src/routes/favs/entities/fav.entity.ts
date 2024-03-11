import { Album } from 'src/routes/album/entities/album.entity';
import { Artist } from 'src/routes/artist/entities/artist.entity';
import { Track } from 'src/routes/track/entities/track.entity';
import { UUID } from 'src/types/general';

export class Favorites {
  artists: UUID[];
  albums: UUID[];
  tracks: UUID[];
}

export interface FavoritesResponse {
  artists: Artist[];
  albums: Album[];
  tracks: Track[];
}
