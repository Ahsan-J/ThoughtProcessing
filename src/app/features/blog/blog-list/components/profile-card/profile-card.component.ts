import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { AuthService } from "@/core/services/auth.service";
import { IUser } from "@/core/models/user/user.model";
import { ButtonComponent } from "@/shared/components/button/button.component";
import { AvatarComponent } from "@/shared/components/avatar/avatar.component";

@Component({
    selector: 'app-profile-card',
    templateUrl: './profile-card.component.html',
    imports: [ButtonComponent, AvatarComponent]
})
export class ProfileCardComponent implements OnDestroy, OnInit {
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
