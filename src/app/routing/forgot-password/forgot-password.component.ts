import { Component } from '@angular/core';
import { ApiService, IApiParam } from 'src/app/shared/api/api.service';
import { unmarshalFormData } from 'src/app/shared/utility';

@Component({
  styleUrls: ['./forgot-password.component.css'],
  templateUrl: './forgot-password.component.html',
})
export class ForgotPasswordComponent {

  constructor(private apiService: ApiService){}

  async onForgot(event: SubmitEvent) {
    event.preventDefault();

    const data = unmarshalFormData(new FormData(event.target as HTMLFormElement))

    const params: IApiParam = {
      method: "POST",
      data,
      path: `auth/forgot-password`
    }

    await this.apiService.request(params);
  }


};
