import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'db_expense_system',
  entities: [__dirname + '/..**/*.entity.ts'],
  synchronize: true,
  autoLoadEntities: true,
  logging: true,
};
