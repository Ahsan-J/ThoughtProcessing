import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpEventType } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // Log the request details
    console.log('HTTP Request:', req);

    // Return the HTTP response observable and log the response when it arrives
    return next.handle(req).pipe(
      tap({
        next: (event) => {
          if (event.type === HttpEventType.Response) {
            console.log('HTTP Response:', event);
          }
        },
        error: (error) => {
          // Log any error response
          console.error('HTTP Error:', error);
        }
      })
    );
  }
}
