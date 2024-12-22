import { Component } from '@angular/core';
import { ApiService, IApiParam } from '@/core/services/api/api.service';
import { unmarshalFormData } from '@/core/utility/form.util';
import { ButtonComponent } from '@/shared/components/button/button.component';

@Component({
  templateUrl: './forgot-password.component.html',
  imports: [ButtonComponent]
})
export class ForgotPasswordComponent {

  constructor(private apiService: ApiService) { }

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
