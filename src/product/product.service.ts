import { Injectable } from '@nestjs/common';
import {
  BadRequestException,
  NotFoundException,
} from '@nestjs/common/exceptions';
import { PrismaService } from '../prisma/prisma.service';
import {
  Product,
  ProductOption,
  ProductOptionValue,
  ProductVariant,
} from '@prisma/client';
import { AddProductDto } from './dto/add-product.dto';
import { AddProductOptionDto } from './dto/add-product-option.dto';
import { AddProductOptionValueDto } from './dto/add-product-option-value.dto';
import { AddProductVariantDto } from './dto/add-product-variant.dto';

import { EditProductDto } from './dto/edit-product.dto';
import { EditProductOptionDto } from './dto/edit-product-option.dto';
import { EditProductOptionValueDto } from './dto/edit-product-option-value.dto';
import { EditProductVariantDto } from './dto/edit-product-variant.dto';
import { GetProductsListQueryDto } from './dto/get-products-list-query.dto';
import { SuccessList } from 'src/utils/dto/success-list.dto';
import { Pagination } from 'src/utils/pagination';

import { Search } from 'src/utils/search';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  async getProducts(): Promise<Product[]> {
    return await this.prisma.product.findMany({
      include: {
        options: {
          include: {
            values: true,
          },
        },
        variants: {
          include: {
            options: true,
          },
        },
      },
    });
  }

  async getProduct(id: number): Promise<Product> {
    return await this.prisma.product.findUnique({
      where: {
        id,
      },
      include: {
        options: {
          include: {
            values: true,
          },
        },
        variants: {
          include: {
            options: true,
          },
        },
      },
    });
  }

  async getProductsList(
    query: GetProductsListQueryDto,
  ): Promise<SuccessList<Product>> {
    const { pagination } = Pagination(query);

    const search = Search(query, [
      { field: 'title' },
      { field: 'subtitle' },
      { field: 'description' },
    ]);

    const totalRows = await this.prisma.product.count({
      where: {
        ...search,
      },
    });

    const products = await this.prisma.product.findMany({
      ...pagination,
      where: {
        ...search,
      },
      include: {
        options: {
          include: {
            values: true,
          },
        },
        variants: {
          include: {
            options: true,
          },
        },
      },
    });

    return {
      data: products,
      totalRows,
    };
  }

  async getProductOptions(productId: number): Promise<ProductOption[]> {
    if (!productId) throw new BadRequestException('Product Id is required');

    return await this.prisma.productOption.findMany({
      where: {
        productId,
      },
    });
  }

  async getProductOptionValues(
    optionId: number,
    variantId: number,
  ): Promise<ProductOptionValue[]> {
    if (!optionId) throw new BadRequestException('Option Id is required');
    if (!variantId) throw new BadRequestException('Variant Id is required');

    return await this.prisma.productOptionValue.findMany({
      where: {
        optionId,
        variantId,
      },
    });
  }

  async getProductVariants(productId: number): Promise<ProductVariant[]> {
    if (!productId) throw new BadRequestException('Product Id is required');

    return await this.prisma.productVariant.findMany({
      where: {
        productId,
      },
    });
  }

  async addProduct(addProductDto: AddProductDto): Promise<Product> {
    return await this.prisma.product.create({
      data: addProductDto,
    });
  }

  async addProductOption(
    productId: number,
    addProductOptionDto: AddProductOptionDto,
  ): Promise<ProductOption> {
    if (!productId) throw new BadRequestException('Product Id is required');

    return await this.prisma.productOption.create({
      data: {
        ...addProductOptionDto,
        product: {
          connect: {
            id: productId,
          },
        },
      },
    });
  }

  async addProductOptionValue(
    optionId: number,
    variantId: number,
    addProductOptionValueDto: AddProductOptionValueDto,
  ): Promise<ProductOptionValue> {
    if (!optionId) throw new BadRequestException('Option Id is required');
    if (!variantId) throw new BadRequestException('Variant Id is required');

    return await this.prisma.productOptionValue.create({
      data: {
        ...addProductOptionValueDto,
        option: {
          connect: {
            id: optionId,
          },
        },
        variant: {
          connect: {
            id: variantId,
          },
        },
      },
    });
  }

  async addProductVariant(
    productId: number,
    addProductVariantDto: AddProductVariantDto,
  ): Promise<ProductVariant> {
    if (!productId) throw new BadRequestException('Product Id is required');

    return await this.prisma.productVariant.create({
      data: {
        ...addProductVariantDto,
        product: {
          connect: {
            id: productId,
          },
        },
      },
    });
  }

  async editProduct(
    productId: number,
    editProductDto: EditProductDto,
  ): Promise<Product> {
    if (!productId) throw new BadRequestException('Product Id is required');

    return await this.prisma.product.update({
      where: {
        id: productId,
      },
      data: editProductDto,
    });
  }

  async editProductOption(
    optionId: number,
    editProductOptionDto: EditProductOptionDto,
  ): Promise<ProductOption> {
    if (!optionId) throw new BadRequestException('Option Id is required');

    return await this.prisma.productOption.update({
      where: {
        id: optionId,
      },
      data: editProductOptionDto,
    });
  }

  async editProductOptionValue(
    optionId: number,
    variantId: number,
    editProductOptionValueDto: EditProductOptionValueDto,
  ): Promise<ProductOptionValue> {
    if (!optionId) throw new BadRequestException('Option Id is required');
    if (!variantId) throw new BadRequestException('Variant Id is required');

    const optionValue = await this.prisma.productOptionValue.findFirst({
      where: {
        optionId,
        variantId,
      },
    });

    if (!optionValue) throw new NotFoundException('Option Value not found');

    return await this.prisma.productOptionValue.update({
      where: {
        id: optionValue?.id,
      },
      data: editProductOptionValueDto,
    });
  }

  async editProductVariant(
    variantId: number,
    editProductVariantDto: EditProductVariantDto,
  ): Promise<ProductVariant> {
    if (!variantId) throw new BadRequestException('Variant Id is required');

    return await this.prisma.productVariant.update({
      where: {
        id: variantId,
      },
      data: editProductVariantDto,
    });
  }

  async deleteProduct(productId: number): Promise<Product> {
    if (!productId) throw new BadRequestException('Product Id is required');

    const product = await this.prisma.product.findUnique({
      where: {
        id: productId,
      },
    });

    if (!product) throw new NotFoundException('Product not found');

    return await this.prisma.product.delete({
      where: {
        id: productId,
      },
    });
  }

  async deleteProductOption(optionId: number): Promise<ProductOption> {
    if (!optionId) throw new BadRequestException('Option Id is required');

    const option = await this.prisma.productOption.findUnique({
      where: {
        id: optionId,
      },
    });

    if (!option) throw new NotFoundException('Option not found');

    return await this.prisma.productOption.delete({
      where: {
        id: optionId,
      },
    });
  }

  async deleteProductOptionValue(
    optionId: number,
    variantId: number,
  ): Promise<ProductOptionValue> {
    if (!optionId) throw new BadRequestException('Option Id is required');
    if (!variantId) throw new BadRequestException('Variant Id is required');

    const optionValue = await this.prisma.productOptionValue.findFirst({
      where: {
        optionId,
        variantId,
      },
    });

    if (!optionValue) throw new NotFoundException('Option Value not found');

    return await this.prisma.productOptionValue.delete({
      where: {
        id: optionValue.id,
      },
    });
  }

  async deleteProductVariant(variantId: number): Promise<ProductVariant> {
    if (!variantId) throw new BadRequestException('Variant Id is required');

    const variant = await this.prisma.productVariant.findUnique({
      where: {
        id: variantId,
      },
    });

    if (!variant) throw new NotFoundException('Variant not found');

    return await this.prisma.productVariant.delete({
      where: {
        id: variantId,
      },
    });
  }
}
