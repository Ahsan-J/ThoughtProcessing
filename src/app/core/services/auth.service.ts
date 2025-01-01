import { Injectable } from '@angular/core'
import { IUser } from '@/core/models/user/user.model';
import { BehaviorSubject } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor() {
    this.loadSavedUserData();
  }

  loadSavedUserData() {
    if (typeof localStorage != 'undefined') {
      let user: IUser | null = null;

      try {
        user = JSON.parse(localStorage.getItem("auth_user") || "null");
      } catch (e) {
        console.error(e)
      }

      this.setAuthUser(user)
    }
  }

  private userSubject = new BehaviorSubject<IUser | null>(null);
  public user$ = this.userSubject.asObservable();

  get user(): Promise<IUser | null> {
    return new Promise(resolve =>
      this.user$.subscribe(user => {
        resolve(user);
      })
    )
  }

  setAuthUser(user: IUser | null) {
    if (typeof localStorage == "undefined") return;

    if (user?.id) {
      localStorage.setItem("auth_user", JSON.stringify(user));
    } else {
      localStorage.removeItem("auth_user");
    }

    this.userSubject.next(user);
  }
};
