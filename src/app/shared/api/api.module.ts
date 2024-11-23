import { HttpClient, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ApiService } from './api.service';

@NgModule({ imports: [], providers: [HttpClient, ApiService, provideHttpClient(withInterceptorsFromDi())] })
export class ApiModule {}
