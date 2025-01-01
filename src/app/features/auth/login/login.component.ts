import { Component } from "@angular/core";
import { unmarshalFormData } from "@/core/utility/form.util";
import { AuthApiService } from "@/core/services/api/auth-api.service";
import { ILoginRequest } from "@/core/models/auth/login-request.dto";
// import { HttpResponse } from "@angular/common/http";
// import { ILoginResponse } from "@/core/models/auth/login-response.dto";
import { FloatingInputComponent } from "@/shared/components/floating-input/floating-input.component";
import { ButtonComponent } from "@/shared/components/button/button.component";
import { GoogleSignInButtonComponent } from "./google-signin.component";

@Component({
  templateUrl: './login.component.html',
  providers: [AuthApiService],
  imports: [
    FloatingInputComponent,
    GoogleSignInButtonComponent,
    ButtonComponent
  ]
})
export class LoginComponent {

  constructor(
    private authApiService: AuthApiService,
  ) { }

  async onLogin(event: SubmitEvent) {
    event.preventDefault();
    if (event.target instanceof HTMLFormElement) {
      const data = unmarshalFormData<ILoginRequest>(new FormData(event.target));
      this.authApiService.login(data).subscribe()
    }
  }
}
