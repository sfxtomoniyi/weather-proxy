import { Module } from '@nestjs/common';
import { WeatherService } from './weather.service';
import { WeatherController } from './weather.controller';
import { CacheService } from 'src/cache/cache.service';

@Module({
  controllers: [WeatherController],
  providers: [WeatherService,CacheService],
})
export class WeatherModule {}
