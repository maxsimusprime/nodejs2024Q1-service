import { IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateTrackDto {
  @IsString()
  readonly name: string;

  @IsNumber()
  readonly duration: number;

  @IsOptional()
  @IsUUID()
  readonly albumId?: string | null;

  @IsOptional()
  @IsUUID()
  readonly artistId?: string | null;
}
