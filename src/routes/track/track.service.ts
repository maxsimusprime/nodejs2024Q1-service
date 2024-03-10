import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { DatabaseService } from 'src/database/database.service';
import { Track } from './entities/track.entity';
import { UUID } from 'src/types/general';

@Injectable()
export class TrackService {
  constructor(private readonly databaseService: DatabaseService) {}

  create(createTrackDto: CreateTrackDto) {
    return this.databaseService.createTrack(createTrackDto);
  }

  findAll(): Track[] {
    return this.databaseService.getAllTracks();
  }

  findOne(id: UUID): Track {
    const track = this.databaseService.getTrackById(id);
    if (!track) throw new NotFoundException();
    return track;
  }

  update(id: UUID, updateTrackDto: UpdateTrackDto): Track {
    this.findOne(id);
    return this.databaseService.updateTrack(id, updateTrackDto);
  }

  remove(id: UUID) {
    const track = this.findOne(id);
    if (track) this.databaseService.deleteTrack(id);
  }
}
