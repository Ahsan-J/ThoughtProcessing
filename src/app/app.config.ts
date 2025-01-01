import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideClientHydration } from '@angular/platform-browser';
import { routes } from './app.routes';
import { HTTP_INTERCEPTORS, provideHttpClient, withFetch, withInterceptorsFromDi } from '@angular/common/http';
import { LoggingInterceptor } from './core/interceptors/logger.interceptor';
import { IdempotentInterceptor } from './core/interceptors/idempotent.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(
      withInterceptorsFromDi(),
      withFetch(),
    ),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: IdempotentInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoggingInterceptor,
      multi: true,
    },
    provideRouter(routes),
    provideClientHydration(),
  ],
};
