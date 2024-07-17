import { DataSource } from 'typeorm';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: 'v8hlDV0yMAHHlIurYupj',
        database: 'simplebank',
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        synchronize: true,
      });
    },
  },
];
