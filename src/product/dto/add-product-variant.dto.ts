import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsNumber,
} from 'class-validator';

export class AddProductVariantDto {
  @IsString({ message: 'Title must be a string.' })
  @IsNotEmpty({ message: 'Provide title.' })
  @ApiProperty()
  title: string;

  @IsString({ message: 'SKU must be a string.' })
  @IsOptional()
  @ApiProperty()
  sku: string;

  @IsString({ message: 'Barcode must be a string.' })
  @IsOptional()
  @ApiProperty()
  barcode: string;

  @IsString({ message: 'EAN must be a string.' })
  @IsOptional()
  @ApiProperty()
  ean: string;

  @IsString({ message: 'UPC must be a string.' })
  @IsOptional()
  @ApiProperty()
  upc: string;

  @IsString({ message: 'Origin Country must be a string.' })
  @IsOptional()
  @ApiProperty()
  originCountry: string;

  @IsString({ message: 'Material must be a string.' })
  @IsOptional()
  @ApiProperty()
  material: string;

  @IsString({ message: 'Mid Code must be a string.' })
  @IsOptional()
  @ApiProperty()
  midCode: string;

  @IsBoolean()
  @IsOptional()
  @ApiProperty()
  allowBackorder: boolean;

  @IsNumber({}, { message: 'Weight must be a number.' })
  @IsOptional()
  @ApiProperty()
  weight: number;

  @IsNumber({}, { message: 'Length must be a number.' })
  @IsOptional()
  @ApiProperty()
  length: number;

  @IsNumber({}, { message: 'Width must be a number.' })
  @IsOptional()
  @ApiProperty()
  width: number;

  @IsOptional()
  @ApiProperty()
  hsCode: string;

  @IsNumber({}, { message: 'Inventory quantity must be a number.' })
  @IsOptional()
  @ApiProperty()
  inventoryQuantity: number;

  @IsBoolean()
  @IsOptional()
  @ApiProperty()
  manageInventory: boolean;

  @IsNumber({}, { message: 'Price must be a number.' })
  @IsOptional()
  @ApiProperty()
  price: number;
}
