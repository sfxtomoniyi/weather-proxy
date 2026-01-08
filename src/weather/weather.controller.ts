import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { WeatherService } from './weather.service';
import { CacheService } from 'src/cache/cache.service';

@Controller('weather')
export class WeatherController {
  constructor(private readonly weatherService: WeatherService, private readonly cacheService: CacheService) {}

  @Get(':id')
  async findOne(@Param('id') id: string) {

    const cacheKey = `item-${id}`;

    
    const cachedItem = this.cacheService.get<any>(cacheKey);
    if (cachedItem) {
      cachedItem.source = 'cache';
      return cachedItem;
    }

    const actualData = await this.weatherService.findOne(id); 
    this.cacheService.set(cacheKey, actualData);

    return actualData;
  }


}
