import { ObjectLiteral, SelectQueryBuilder } from 'typeorm';

export async function pagination<T extends ObjectLiteral>(
  Q: SelectQueryBuilder<T>,
  page: number = 1,
  limit: number = 10,
) {
  page = page < 1 ? 1 : page;
  limit = limit > 20 ? 20 : limit < 10 ? 10 : limit;

  const [data, total] = await Q.skip((page - 1) * limit)
    .take(limit)
    .getManyAndCount();

  return {
    data: data,
    total,
    pages: Math.ceil(total / limit),
    page,
    limit,
  };
}
