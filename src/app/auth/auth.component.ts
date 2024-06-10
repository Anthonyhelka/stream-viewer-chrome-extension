import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  view = 'login';
  loading = false;
  errorMessage = '';

  constructor(private authService: AuthService, private loginService: LoginService, private router: Router) { }

  ngOnInit() {
    if (this.authService.isLoggedIn) {
      this.router.navigate(['/']);
    }
  }

  onNavigate(destination: string) {
    this.view = destination;
    this.errorMessage = '';
    this.authService.password.next('');
  }

  onLogin() {
    const username = this.authService.username.value;
    const password = this.authService.password.value;

    this.loading = true;
    this.errorMessage = '';

    const data = { password };
    username.includes('@') ? data['email'] = username : data['streamViewerTag'] = username;

    this.authService.login(data).subscribe((resBody: any) => {
      this.loading = false;
      this.loginService.loginResult(resBody, 'login', null);

      if (this.authService.isLoggedIn) {
        this.router.navigate(['/']);
      } else {
        this.errorMessage = 'An unknown error has occurred, please try again';
      }
    }, (error: any) => {
      this.errorMessage = error || 'Invalid username and password combination';
      this.loading = false;
    });
  }
}
