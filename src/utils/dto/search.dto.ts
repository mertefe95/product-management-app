import { ApiProperty } from '@nestjs/swagger';

import { IsOptional, IsString } from 'class-validator';

export class SearchDto {
  @IsString({ message: 'Search must be a string.' })
  @IsOptional()
  @ApiProperty()
  search: string;
}
