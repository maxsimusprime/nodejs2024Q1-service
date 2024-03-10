import { IsNumber, IsString, IsUUID, ValidateIf } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

class UnnecessaryFields {
  @IsUUID()
  readonly albumId?: string | null;

  @IsUUID()
  readonly artistId: string | null;
}

class UnnecessaryDto extends PartialType(UnnecessaryFields) {}

export class CreateTrackDto extends UnnecessaryDto {
  @IsString()
  readonly name: string;

  @IsNumber()
  readonly duration: number;
}
