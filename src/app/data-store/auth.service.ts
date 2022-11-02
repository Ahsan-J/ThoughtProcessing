import { Injectable } from '@angular/core'
import { IUser } from '../model/user';
import { BehaviorSubject, Subject } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private userSubject = new BehaviorSubject<IUser | null>(null);
  public user$ = this.userSubject.asObservable();

  setAuthUser(user: IUser | null) {
    if(typeof localStorage == "undefined") return;

    if(user?.id) {
      localStorage.setItem("auth_user", JSON.stringify(user));
      this.userSubject.next(user);
    } else {
      localStorage.removeItem("auth_user");
      this.userSubject.next(user);
    }
  }
};
