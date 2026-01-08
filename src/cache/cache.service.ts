import { Injectable } from '@nestjs/common';

interface CacheItem<T> {
  data: T;
  timestamp: number;
}

@Injectable()
export class CacheService {
  
  private cache = new Map<string, CacheItem<any>>();
  
  private readonly TTL = 600000;

 
  get<T>(key: string): T | null {
    const item = this.cache.get(key);

    if (!item) {
      return null;
    }

    
    if (Date.now() - item.timestamp > this.TTL) {
      this.cache.delete(key); 
      return null;
    }

    return item.data;
  }

 
  set<T>(key: string, data: T): void {
    this.cache.set(key, { data, timestamp: Date.now() });
  }

  
  clear(): void {
    this.cache.clear();
  }
}
