import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class EditProductOptionDto {
  @IsString({ message: 'Title must be a string.' })
  @IsNotEmpty({ message: 'Provide title.' })
  @ApiProperty()
  title: string;
}
