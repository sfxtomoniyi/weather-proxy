import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class WeatherService {
  constructor(private readonly configService: ConfigService) {}

  async findOne(id: string) {
    const search = await fetch(
      `${this.configService.get('BASE_URL')}?access_key=${this.configService.get('API_KEY')}&query=${id}`,
    )

    if (!search.ok) {
      throw new HttpException('Failed to fetch weather data', HttpStatus.BAD_GATEWAY);
    }

    const data = await search.json();

    if (data.error) {
      throw new HttpException(data.error.info || 'Weather API Error', HttpStatus.BAD_REQUEST);
    }

        return {
          city: data.location.name,
          temperature: data.current.temperature,
          condition: data.current.weather_descriptions[0],
          source: 'api',
          cachedAt: new Date().toISOString(),
        };
      }
  }
