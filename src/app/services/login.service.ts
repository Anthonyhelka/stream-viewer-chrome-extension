import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Injectable({ providedIn: 'root' })
export class LoginService {
  constructor(private authService: AuthService) {}

  loginResult(resBody: any, type: string, teamInviteJwt = null) {
    const token = resBody.accessToken;
    const payload = resBody.payload;
    payload['userId'] = payload.auth0Id;
    if (token && payload) {
      localStorage.setItem('token', token);
      localStorage.setItem('refresh_token', token);
      localStorage.setItem('expiration', payload.expiration);
      this.authService.payload = JSON.stringify(payload);
      console.log('Logged In!');
    }
  }
}
