import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsEnum,
} from 'class-validator';

const { ProductStatus } = require('@prisma/client');

export class AddProductDto {
  @IsString({ message: 'Title must be a string.' })
  @IsNotEmpty({ message: 'Provide title.' })
  @ApiProperty()
  title: string;

  @IsString({ message: 'Subtitle must be a string.' })
  @IsOptional()
  @ApiProperty()
  subtitle: string;

  @IsString({ message: 'Description must be a string.' })
  @IsOptional()
  @ApiProperty()
  description: string;

  @IsString({ message: 'Handle must be a string.' })
  @IsOptional()
  @ApiProperty()
  handle: string;

  @IsBoolean({ message: 'Giftcard must be a boolean.' })
  @IsOptional()
  @ApiProperty()
  isGiftcard: boolean;

  @IsEnum(ProductStatus, {
    each: true,
    message: `Product status must be one of the product status type.`,
  })
  @IsOptional()
  @ApiProperty()
  status: typeof ProductStatus;

  @IsString({ message: 'Thumbnail must be a string.' })
  @IsOptional()
  @ApiProperty()
  thumbnail: string;

  @IsString({ message: 'ExternalId must be a string.' })
  @IsOptional()
  @ApiProperty()
  externalId: string;
}
