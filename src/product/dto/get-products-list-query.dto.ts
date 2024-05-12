import { IntersectionType } from '@nestjs/swagger';

import { PaginationDto } from 'src/utils/pagination';
import { SearchDto } from 'src/utils/dto/search.dto';

export class GetProductsListQueryDto extends IntersectionType(
  PaginationDto,
  SearchDto,
) {}
