import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './database.config';
import { ConfigModule, ConfigService } from '@nestjs/config'; // Import ConfigService

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) =>
        typeOrmConfig(configService),
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
