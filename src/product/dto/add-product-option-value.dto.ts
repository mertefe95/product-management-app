import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class AddProductOptionValueDto {
  @IsString({ message: 'Value must be a string.' })
  @IsNotEmpty({ message: 'Provide value.' })
  @ApiProperty()
  value: string;
}
