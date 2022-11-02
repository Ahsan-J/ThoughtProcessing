import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthService } from './data-store/auth.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  constructor(private authService: AuthService) { }

  ngOnInit() {
    if(typeof localStorage != 'undefined') {
      this.authService.setAuthUser(JSON.parse(localStorage.getItem("auth_user") || "null"))
    }
  }

}
