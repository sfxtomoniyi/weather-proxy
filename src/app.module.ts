import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WeatherModule } from './weather/weather.module';
import { CacheService } from './cache/cache.service';
import { ConfigModule } from '@nestjs/config';


@Module({
  imports: [WeatherModule, ConfigModule.forRoot({
      isGlobal: true, 
      envFilePath: '.env', 
    }),],
  controllers: [AppController],
  providers: [AppService, CacheService],
  exports: [CacheService],
})
export class AppModule {}
