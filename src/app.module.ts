import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HttpModule } from '@nestjs/axios';
import { configLoader } from 'config-loader';
import { envSchema } from 'env-schema';

@Module({
  imports: [
    ConfigModule.forRoot({
      load:[configLoader],
      validationSchema:envSchema
    }),
    HttpModule,
    ConfigModule.forRoot(),
      ],
  controllers: [AppController],
  providers: [AppService,ConfigModule],
})
export class AppModule {}