import { Component, OnChanges, SimpleChanges } from '@angular/core';
import { IUser } from 'src/app/model/user';
import { ApiService, IApiParam } from 'src/app/shared/api/api.service';
import { unmarshalFormData } from 'src/app/shared/utility';

@Component({
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnChanges {

  email: IUser['email'] = '';
  emailErrorText: string = '';
  name: IUser['name'] = '';
  emailVerified: boolean = false;

  constructor(private apiService: ApiService) {}

  async onNextStep(event: SubmitEvent) {
    event.preventDefault();

    const data = unmarshalFormData(new FormData(event.target as HTMLFormElement));

    const params: IApiParam = {
      path: 'auth/check-availability',
      method: "POST",
      data,
    }

    const response = await this.apiService.request(params);
    if(response.data) {
      this.emailVerified = response.data;
      this.email = data.email
    }
    else this.emailErrorText = ""

  }

  async onSignup(event: SubmitEvent) {
    event.preventDefault();
    const data = unmarshalFormData(new FormData(event.target as HTMLFormElement));

    const params: IApiParam = {
      path: 'auth/register',
      method: "POST",
      data,
    }

    const response = await this.apiService.request(params);
    console.log(response);
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
  }
}
