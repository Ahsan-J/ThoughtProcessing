import { Component } from "@angular/core";
import { Subscription } from "rxjs";
import { AuthService } from "src/app/data-store/auth.service";
import { IUser } from "src/app/model/user";

@Component({
  selector: 'profile-card',
  templateUrl: './profile-card.component.html',
})
export class ProfileCardComponent {
  public user?: IUser;
  private sub?: Subscription;

  constructor(private authService: AuthService) { }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  ngOnInit(): void {
    this.sub = this.authService.user$.subscribe(user => {
      if (user) this.user = user;
    })
  }
}
