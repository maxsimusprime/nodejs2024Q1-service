import { IsNumber, IsString, IsUUID } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

class UnnecessaryFields {
  @IsUUID()
  readonly artistId: string | null;
}

class UnnecessaryDto extends PartialType(UnnecessaryFields) {}

export class CreateAlbumDto {
  @IsString()
  readonly name: string;

  @IsNumber()
  readonly year: number;
}
