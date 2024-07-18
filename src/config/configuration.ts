export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  database: {
    type: process.env.DB_TYPE || 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT, 10) || 5432,
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || 'v8hlDV0yMAHHlIurYupj',
    database: process.env.DB_DATABASE || 'simplebank',
    synchronize: process.env.DB_SYNCHRONIZE || true,
  },
});
