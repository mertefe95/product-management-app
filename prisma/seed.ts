const { PrismaClient } = require('@prisma/client');
const productOptions = require('./seeds/product-option.ts');
const products = require('./seeds/product.ts');
const productOptionValues = require('./seeds/product-option-value.ts');
const productVariants = require('./seeds/product-variant.ts');

const prisma = new PrismaClient();

const seed = async () => {
  await prisma.productOption.deleteMany();
  await prisma.productVariant.deleteMany();
  await prisma.product.deleteMany();
  await prisma.productOptionValue.deleteMany();

  await prisma.product.createMany({ data: products });
  await prisma.productOption.createMany({ data: productOptions });
  await prisma.productVariant.createMany({ data: productVariants });
  await prisma.productOptionValue.createMany({ data: productOptionValues });
};

seed();
