import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ApiService } from './api.service';

@NgModule({
  imports: [HttpClientModule],
  providers: [HttpClient, ApiService],
})
export class ApiModule {}
