import { SearchDto } from './dto/search.dto';

function createSimpleObject(name, value) {
  const obj = {};
  obj[name] = value;
  return obj;
}

export function Search(
  query: SearchDto,
  searchFields: {
    type?: string;
    relations?: string[];
    field: string;
  }[],
) {
  const types = {
    text: {
      contains: query?.search,
      mode: 'insensitive',
    },
    number: {
      equals: Number(query?.search) > 0 ? Number(query?.search) : 0,
    },
  };

  return query.search
    ? {
        OR: searchFields?.map((field) => {
          const searchValue = types?.[`${field?.type ?? 'text'}`];

          if (!field?.relations || field?.relations?.length === 0)
            return { [field?.field]: searchValue };
          else if (field?.relations && field?.relations?.length > 0) {
            let joinedRelations = {};

            field?.relations.map((relation, relationIndex) => {
              if (relationIndex == 0) {
                const relationQuery = createSimpleObject(relation, {
                  [field?.field]: searchValue,
                });
                joinedRelations = relationQuery;
              } else {
                const relationQuery = createSimpleObject(
                  relation,
                  joinedRelations,
                );
                joinedRelations = relationQuery;
              }
            });

            return joinedRelations;
          }
        }),
      }
    : {};
}
