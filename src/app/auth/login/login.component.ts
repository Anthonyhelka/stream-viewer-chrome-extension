import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { verifyWithDiscord, verifyWithFacebook, verifyWithGoogle, verifyWithTrovo, verifyWithTwitch } from 'src/app/services/socials.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  username: string;
  password: string;
  rememberMe: boolean;
  showPassword: boolean;

  constructor(public authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.authService.username.subscribe(value => this.username = value);
    this.authService.password.subscribe(value => this.password = value);
    this.authService.rememberMe.subscribe(value => this.rememberMe = value);
  }

  onToggleRememberMe(toggled: boolean) {
    this.authService.rememberMe.next(toggled);
  }

  loginDiscord() {
    return verifyWithDiscord({ type: 'auth', teamInviteJwt: null });
  }

  loginTwitch() {
    return verifyWithTwitch({ type: 'auth', teamInviteJwt: null });
  }

  loginYoutube() {
    return verifyWithGoogle({ type: 'auth', teamInviteJwt: null });
  }

  loginFacebook() {
    return verifyWithFacebook({ type: 'auth', teamInviteJwt: null });
  }

  loginTrovo() {
    return verifyWithTrovo({ type: 'auth', teamInviteJwt: null });
  }
}
