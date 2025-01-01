import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    FontAwesomeModule,
  ],
  template: `<router-outlet></router-outlet>`,
})
export class AppComponent {}
