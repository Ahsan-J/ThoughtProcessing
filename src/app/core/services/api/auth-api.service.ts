import { Injectable } from "@angular/core";
import { ApiService, IApiParam } from "@/core/services/api/api.service";
import { AuthService } from "@/core/services/auth.service";
import { ObjectType } from "@/core/types/collection.types";
import { ILoginRequest } from "@/core/models/auth/login-request.dto";
import { ILoginResponse } from "@/core/models/auth/login-response.dto";
import { tap } from "rxjs";

@Injectable()
export class AuthApiService {
  constructor(private apiService: ApiService, private authService: AuthService) { }

  login(data: ILoginRequest) {

    const params: IApiParam<ILoginRequest> = {
      data,
      method: "POST",
      path: "v1/auth/login",
    };

    return this.apiService.request<ILoginRequest, ILoginResponse>(params)
      .pipe(
        tap({
          next: response => this.setLoginResponse(response.body)
        })
      );
  }

  signup(data: ObjectType) {
    const params: IApiParam = {
      path: 'auth/register',
      method: "POST",
      data,
    }

    return this.apiService.request(params);
  }

  checkAvailability(data: ObjectType) {
    const params: IApiParam = {
      path: 'v1/auth/check-availability',
      method: "POST",
      data,
    }

    return this.apiService.request(params);
  }

  logout() {
    if(window.google) {
      window.google.accounts.id.disableAutoSelect();
    }

    localStorage.removeItem('user');
  }

  verifyGoogleToken(credential: string) {
    const params: IApiParam = {
      path: 'v1/auth/google',
      method: "POST",
      data: {
        credential
      },
    }

    return this.apiService.request<unknown, ILoginResponse>(params)
      .pipe(
        tap({
          next: response => this.setLoginResponse(response.body)
        })
      );
  }

  private setLoginResponse(data: ILoginResponse | null) {
    if(!data) return
    this.authService.setAuthUser(data.user)
  }
}
