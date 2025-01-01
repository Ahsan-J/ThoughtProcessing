import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ICacheManager } from '../interface/cache-manager.interface';
import { LRUCacheManager } from '../utility/cache.util';
import { nanoid } from 'nanoid';

interface CacheItem {
  url: string;
  date: Date
}

@Injectable()
export class IdempotentInterceptor implements HttpInterceptor {
  private cacheManager: ICacheManager<CacheItem>;

  constructor() {
    this.cacheManager = new LRUCacheManager<CacheItem>(100);
  }

  getCacheKey(url: string, forceNew = false): string {
    if(url && this.cacheManager.check(url) && !forceNew) {
      const item = this.cacheManager.get(url);
      if(item) return item.url;
    }

    const key = nanoid();
    this.cacheManager.save(key, { url, date: new Date() });

    return key;
  }

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    const key = this.getCacheKey(req.url);
    req.headers.append('x-request-id', key);

    return next.handle(req);
  }
}
