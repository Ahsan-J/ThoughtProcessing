import { Component } from '@angular/core';
import { faArrowLeft, faGlobe } from '@fortawesome/free-solid-svg-icons';
import { faLinkedin, faGithub,  } from '@fortawesome/free-brands-svg-icons';
import { IUser } from '@/core/models/user/user.model';
// import { IApiParam } from '@/core/services/api/api.service';
import { unmarshalFormData } from '@/core/utility/form.util';
import { AuthApiService } from '@/core/services/api/auth-api.service';
import { FloatingInputComponent } from '@/shared/components/floating-input/floating-input.component';
import { ButtonComponent } from '@/shared/components/button/button.component';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { ImageCropperComponent } from '@/shared/components/image-cropper/image-cropper.component';
import { FloatingTextareaComponent } from '@/shared/components/floating-textarea/floating-textarea.component';

@Component({
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.css'],
    imports: [
      ButtonComponent,
      FaIconComponent,
      ImageCropperComponent,
      FloatingInputComponent,
      FloatingTextareaComponent
    ]
})
export class SignupComponent {

  email: IUser['email'] = '';
  emailErrorText = '';
  name: IUser['name'] = '';
  emailVerified = false;

  faArrowLeft = faArrowLeft;
  faLinkedin = faLinkedin;
  faGithub = faGithub;
  faGlobe = faGlobe;

  constructor(private authApiService: AuthApiService) {}

  async onNextStep(event: SubmitEvent) {
    event.preventDefault();

    const data = unmarshalFormData(new FormData(event.target as HTMLFormElement));

    this.authApiService.checkAvailability(data)
  }

  async onSignup(event: SubmitEvent) {
    event.preventDefault();

    const data = new FormData(event.target as HTMLFormElement)
    this.authApiService.signup(unmarshalFormData(data))

  }
}
