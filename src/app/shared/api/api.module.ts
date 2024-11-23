import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ApiService } from './api.service';

@NgModule({
  imports: [],
  providers: [
    ApiService,
    provideHttpClient(withInterceptorsFromDi()),
  ] ,
})
export class ApiModule {}
