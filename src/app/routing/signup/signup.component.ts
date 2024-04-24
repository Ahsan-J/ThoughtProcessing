import { Component } from '@angular/core';
import { faArrowLeft, faGlobe } from '@fortawesome/free-solid-svg-icons';
import { faLinkedin, faGithub,  } from '@fortawesome/free-brands-svg-icons';
import { IUser } from 'src/app/model/user';
import { ApiService, IApiParam } from 'src/app/shared/api/api.service';
import { unmarshalFormData } from 'src/app/shared/utility';

@Component({
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {

  email: IUser['email'] = '';
  emailErrorText: string = '';
  name: IUser['name'] = '';
  emailVerified: boolean = false;

  faArrowLeft = faArrowLeft;
  faLinkedin = faLinkedin;
  faGithub = faGithub;
  faGlobe = faGlobe;

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

    const params: IApiParam = {
      path: 'auth/register',
      method: "POST",
      data: new FormData(event.target as HTMLFormElement),
    }

    const response = await this.apiService.request(params);
  }
}
