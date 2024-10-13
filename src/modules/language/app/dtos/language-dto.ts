import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class LanguageDto {
  @IsNumber()
  language_id: number;

  @IsString()
  name: string;
}

export class UpdateLanguageDto {
  @IsNumber()
  language_id: number;

  @IsString()
  name: string;
}

export class CreateLanguageDto {
  @ApiProperty({ name: 'name' })
  @IsString()
  name: string;
}

export class GetLanguageParamDto {
  @ApiProperty({ name: 'language_id' })
  @IsNumber()
  language_id: number;
}
