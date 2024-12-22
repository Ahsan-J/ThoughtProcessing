import { AuthApiService } from "@/core/services/api/auth-api.service";
import { Component, OnInit } from "@angular/core";
// import { IUser } from "@/core/models/user/user.model";
import { AuthService } from "@/core/services/auth.service";

@Component({
  selector: 'app-google-signin-button',
  templateUrl: './google-signin.component.html',
  providers: [AuthApiService, AuthService]
})
export class GoogleSignInButtonComponent implements OnInit {

  constructor(private authApiService: AuthApiService) { }

  ngOnInit() {
    // Load Google Sign-In script
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    script.onload = () => {
      this.initializeGoogleSignIn();
    };
    document.body.appendChild(script);
  }

  initializeGoogleSignIn() {
    window.google.accounts.id.initialize({
      client_id: process.env['GOOGLE_CLIENT_ID']?.toString(),
      callback: this.handleCredentialResponse.bind(this)
    });

    window.google.accounts.id.renderButton(
      document.getElementById('google-signin-button'),
      {
        theme: 'outline',
        size: 'large'
      }
    );
  }

  handleCredentialResponse(response: unknown) {
    console.log(response);
    // Send ID token to backend for verification
    // this.authApiService.verifyGoogleToken(response.credential).subscribe({
    //   next: (user) => {
    //     this.authService.setAuthUser(user);
    //   },
    //   error: (err) => {
    //     console.error('Login failed', err);
    //     this.authService.setAuthUser(null)
    //   }
    // });
  }

  logout() {
    this.authApiService.logout();
  }
}
