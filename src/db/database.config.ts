import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'v8hlDV0yMAHHlIurYupj',
  database: 'simplebank',
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  synchronize: true,
};
