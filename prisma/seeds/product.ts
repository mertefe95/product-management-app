const { ProductStatus } = require('@prisma/client');

module.exports = [
  {
    createdAt: '2024-05-12T11:08:48.816Z',
    updatedAt: '2024-05-12T11:08:48.816Z',
    deletedAt: null,
    title: 'Medusa T-Shirt',
    subtitle: null,
    description:
      'Reimagine the feeling of a classic T-shirt. With our cotton T-shirts, everyday essentials no longer have to be ordinary.',
    handle: 't-shirt',
    isGiftcard: false,
    status: ProductStatus.PUBLISHED,
    thumbnail:
      'https://medusa-public-images.s3.eu-west-1.amazonaws.com/tee-black-front.png',
  },
];
