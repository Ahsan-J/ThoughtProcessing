import { enableProdMode } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';

if (import.meta.env['NODE_ENV'] == "production") {
  enableProdMode();
}

function bootstrap() {
  bootstrapApplication(AppComponent, appConfig).catch(e => console.error(e));
};


if (document.readyState === 'complete') {
  bootstrap();
} else {
  document.addEventListener('DOMContentLoaded', bootstrap);
}

