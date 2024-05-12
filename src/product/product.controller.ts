import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  Post,
  ParseIntPipe,
  Query,
} from '@nestjs/common';

import {
  Product,
  ProductOption,
  ProductOptionValue,
  ProductVariant,
} from '@prisma/client';

import { ProductService } from './product.service';

import { AddProductDto } from './dto/add-product.dto';
import { AddProductOptionDto } from './dto/add-product-option.dto';
import { AddProductOptionValueDto } from './dto/add-product-option-value.dto';
import { AddProductVariantDto } from './dto/add-product-variant.dto';

import { EditProductDto } from './dto/edit-product.dto';
import { EditProductOptionDto } from './dto/edit-product-option.dto';
import { EditProductOptionValueDto } from './dto/edit-product-option-value.dto';
import { EditProductVariantDto } from './dto/edit-product-variant.dto';
import { SuccessList } from 'src/utils/dto/success-list.dto';
import { GetProductsListQueryDto } from './dto/get-products-list-query.dto';

@Controller('/product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get('/')
  async getProducts(): Promise<Product[]> {
    return this.productService.getProducts();
  }

  @Get('/list')
  async getProductsList(
    @Query() query: GetProductsListQueryDto,
  ): Promise<SuccessList<Product>> {
    return this.productService.getProductsList(query);
  }

  @Get('/:id')
  async getProduct(@Param('id', ParseIntPipe) id: number): Promise<Product> {
    return this.productService.getProduct(id);
  }

  @Get('/:id/option')
  async getProductOptions(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ProductOption[]> {
    return this.productService.getProductOptions(id);
  }

  @Get('/:optionId/option/:variantId/value')
  async getProductOptionValues(
    @Param('optionId', ParseIntPipe) optionId: number,
    @Param('variantId', ParseIntPipe) variantId: number,
  ): Promise<ProductOptionValue[]> {
    return this.productService.getProductOptionValues(optionId, variantId);
  }

  @Get('/:id/variant')
  async getProductVariants(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ProductVariant[]> {
    return this.productService.getProductVariants(id);
  }

  @Post('/')
  async addProduct(@Body() addProductDto: AddProductDto): Promise<Product> {
    return this.productService.addProduct(addProductDto);
  }

  @Post('/:id/option')
  async addProductOption(
    @Param('id', ParseIntPipe) id: number,
    @Body() addProductOptionDto: AddProductOptionDto,
  ): Promise<ProductOption> {
    return this.productService.addProductOption(id, addProductOptionDto);
  }

  @Post('/:optionId/option/:variantId/value')
  async addProductOptionValue(
    @Param('optionId', ParseIntPipe) optionId: number,
    @Param('variantId', ParseIntPipe) variantId: number,
    @Body() addProductOptionValueDto: AddProductOptionValueDto,
  ): Promise<ProductOptionValue> {
    return this.productService.addProductOptionValue(
      optionId,
      variantId,
      addProductOptionValueDto,
    );
  }

  @Post('/:id/variant')
  async addProductVariant(
    @Param('id', ParseIntPipe) id: number,
    @Body() addProductVariantDto: AddProductVariantDto,
  ): Promise<ProductVariant> {
    return this.productService.addProductVariant(id, addProductVariantDto);
  }

  @Put('/:id')
  async editProduct(
    @Param('id', ParseIntPipe) id: number,
    @Body() editProductDto: EditProductDto,
  ): Promise<Product> {
    return this.productService.editProduct(id, editProductDto);
  }

  @Put('/:id/option')
  async editProductOption(
    @Param('id', ParseIntPipe) id: number,
    @Body() editProductOptionDto: EditProductOptionDto,
  ): Promise<ProductOption> {
    return this.productService.editProductOption(id, editProductOptionDto);
  }

  @Put('/:optionId/option/:variantId/value')
  async editProductOptionValue(
    @Param('optionId', ParseIntPipe) optionId: number,
    @Param('variantId', ParseIntPipe) variantId: number,
    @Body() editProductOptionValueDto: EditProductOptionValueDto,
  ): Promise<ProductOptionValue> {
    return this.productService.editProductOptionValue(
      optionId,
      variantId,
      editProductOptionValueDto,
    );
  }

  @Put('/:id/variant')
  async editProductVariant(
    @Param('id', ParseIntPipe) id: number,
    @Body() editProductVariantDto: EditProductVariantDto,
  ): Promise<ProductVariant> {
    return this.productService.editProductVariant(id, editProductVariantDto);
  }

  @Delete('/:id')
  async deleteProduct(@Param('id', ParseIntPipe) id: number): Promise<Product> {
    return this.productService.deleteProduct(id);
  }

  @Delete('/:id/option')
  async deleteProductOption(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ProductOption> {
    return this.productService.deleteProductOption(id);
  }

  @Delete('/:optionId/option/:variantId/value')
  async deleteProductOptionValue(
    @Param('optionId', ParseIntPipe) optionId: number,
    @Param('variantId', ParseIntPipe) variantId: number,
  ): Promise<ProductOptionValue> {
    return this.productService.deleteProductOptionValue(optionId, variantId);
  }

  @Delete('/:id/variant')
  async deleteProductVariant(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ProductVariant> {
    return this.productService.deleteProductVariant(id);
  }
}
