import { Component } from "@angular/core";
import { AuthService } from "../../services/auth.service";
import { ApiService, IApiParam } from "../../shared/api/api.service";
import { unmarshalFormData } from "../../shared/utility";

@Component({
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
    standalone: false
})
export class LoginComponent {

  constructor(
    private apiService: ApiService,
    private authService: AuthService,
  ) {}

  async onLogin(event: SubmitEvent) {
    event.preventDefault();

    const params: IApiParam = {
      data: unmarshalFormData(new FormData(event.target as HTMLFormElement)),
      method: "POST",
      path: "auth/login",
    };

    const response = (await this.apiService.request(params));

    this.authService.setAuthUser(response.data);
  }
}
