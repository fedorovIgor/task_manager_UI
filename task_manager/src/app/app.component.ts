import { Component, OnInit } from '@angular/core';
import { OAuthService, JwksValidationHandler, NullValidationHandler } from 'angular-oauth2-oidc';
import { authCodeFlowConfig } from './sso_config';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  

  constructor(private oauthService: OAuthService) {this.configureSSO();}

  ngOnInit(): void {
    this.configureSSO();
  }

  configureSSO() {
    this.oauthService.configure(authCodeFlowConfig);
    this.oauthService.tokenValidationHandler = new NullValidationHandler();
    this.oauthService.loadDiscoveryDocumentAndTryLogin();
  }

  login() {
    console.log("in login")
    this.oauthService.initCodeFlow();
  }

  logout() {
    this.oauthService.logOut()
  }

  get token() {
    let claims: any = this.oauthService.getIdentityClaims();
    localStorage.setItem('token', this.oauthService.getAccessToken());
    return claims ? claims: null;
  }
}
