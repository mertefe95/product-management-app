import { ApiProperty } from '@nestjs/swagger';

import { IsNumber, IsNotEmpty } from 'class-validator';

export class PaginationDto {
  @IsNumber({}, { message: 'Page number must be a number.' })
  @IsNotEmpty({ message: 'Provide page number.' })
  @ApiProperty()
  pageNumber: number;

  @IsNumber({}, { message: 'Pagination per page number must be a number.' })
  @IsNotEmpty({ message: 'Provide pagination per page.' })
  @ApiProperty()
  paginationPerPage: number;
}

export function Pagination(query: {
  pageNumber: number;
  paginationPerPage: number;
}) {
  return {
    pagination: {
      skip:
        query.pageNumber * query.paginationPerPage - query.paginationPerPage,
      take: +query.paginationPerPage,
    },
  };
}
