import { AuthApiService } from "@/core/services/api/auth-api.service";
import { Component, PLATFORM_ID, Inject, OnInit } from "@angular/core";
import { AuthService } from "@/core/services/auth.service";
import { ObjectType } from "@/core/types/collection.types";
import { isPlatformBrowser } from "@angular/common";
import { GoogleResponse } from "./google-signin.types";

@Component({
  selector: 'app-google-signin-button',
  template: '<div id="google-signin-button"></div>',
  providers: [AuthApiService, AuthService]
})
export class GoogleSignInButtonComponent implements OnInit {

  constructor(
    @Inject(PLATFORM_ID) private platformId: ObjectType,
    private authApiService: AuthApiService,
  ) { }

  ngOnInit() {
    if (!isPlatformBrowser(this.platformId)) return
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

  private initializeGoogleSignIn() {
    window.google.accounts.id.initialize({
      client_id: import.meta.env['NG_GOOGLE_CLIENT_ID'],
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

  private handleCredentialResponse(response: GoogleResponse) {
    return this.authApiService
      .verifyGoogleToken(response.credential)
      .subscribe();
  }
}
