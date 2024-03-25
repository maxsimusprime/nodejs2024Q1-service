import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { DatabaseService } from 'src/database/database.service';
import { Track } from './entities/track.entity';
import { UUID } from 'src/types/general';

@Injectable()
export class TrackService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createTrackDto: CreateTrackDto): Promise<Track> {
    try {
      return await this.databaseService.createTrack(createTrackDto);
    } catch {
      throw new BadRequestException();
    }
  }

  async findAll(): Promise<Track[]> {
    return await this.databaseService.getAllTracks();
  }

  async findOne(id: UUID): Promise<Track> {
    const track = await this.databaseService.getTrackById(id);
    if (!track) throw new NotFoundException();
    return track;
  }

  async update(id: UUID, updateTrackDto: UpdateTrackDto): Promise<Track> {
    await this.findOne(id);
    try {
      return await this.databaseService.updateTrack(id, updateTrackDto);
    } catch {
      throw new BadRequestException();
    }
  }

  async remove(id: UUID): Promise<void> {
    const track = await this.findOne(id);
    if (track) await this.databaseService.deleteTrack(id);
  }
}
