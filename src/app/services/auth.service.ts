import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { UserModel } from '../models/user.model';
import { buildHTTPClient, HTTPClient } from '../globals/global-functions';

@Injectable({ providedIn: 'root' })
export class AuthService {
  // Auth Variables
  private initialPayload = localStorage.getItem('payload');
  payloadValue = new BehaviorSubject(this.initialPayload);
  userValue = new BehaviorSubject(new UserModel(JSON.parse(this.initialPayload)));

  // Login/Register/Forgot Password Variables
  authFormOpen = new BehaviorSubject(false);
  username = new BehaviorSubject('');
  email = new BehaviorSubject('');
  password = new BehaviorSubject('');
  isCreator = new BehaviorSubject(false);
  rememberMe = new BehaviorSubject(false);
  receiveEmailUpdates = new BehaviorSubject(true);
  agreeToTerms = new BehaviorSubject(false);

  httpClient: HTTPClient;

  constructor(private http: HttpClient, private router: Router) {
    this.httpClient = buildHTTPClient(this.http);
    this.payload = this.initialPayload;
  }

  set payload(value: string) {
    this.payloadValue.next(value);
    this.userValue.next(new UserModel(JSON.parse(value)));
    console.log(JSON.parse(value));
    if (value === null) {
      localStorage.removeItem('payload');
    } else {
      localStorage.setItem('payload', value);
    }
  }

  get user() {
    return this.userValue.value;
  }

  get isLoggedIn() {
    return !!this.userValue.value.userId;
  }

  get isSupportAdmin() {
    return this.isLoggedIn && this.userValue.value.tag.toLowerCase() === 'streamViewer_support';
  }

  login(data: any) {
    return this.httpClient.put('/login', data);
  }

  loginOAuth(platform: string, code: string) {
    return this.httpClient.put(`/loginSocial/${platform}/${code}/false/VIEWER/null`);
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('payload');
    localStorage.removeItem('expiration');
    localStorage.removeItem('refresh_token');
    this.payload = null;
    this.router.navigate(['/login']);
    console.log('Logged Out!');
  }

  register(data: any, userType: string, referralJwt = null): any {
    return this.httpClient.put(`/user/createUser/${data.emailAllowed}/${userType}/${referralJwt}`, data);
  }

  getOAuthToken(data: { clientId: string, redirectUri: string }) {
    return this.httpClient.put(`/oauth/verify/${this.user.userId}`, data);
  }

  clearRegistrationValues() {
    this.username.next('');
    this.email.next('');
    this.password.next('');
    this.isCreator.next(false);
    this.rememberMe.next(false);
    this.receiveEmailUpdates.next(true);
    this.agreeToTerms.next(false);
  }
}
