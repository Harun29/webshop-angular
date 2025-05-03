import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {NgIf} from '@angular/common';
import {Router} from '@angular/router';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  imports: [
    FormsModule,
    NgIf
  ],
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  isLoginMode = true;

  loginData = {
    username: '',
    password: ''
  };

  registerData = {
    username: '',
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    street: '',
    city: '',
    postalCode: '',
    country: '',
    phone: ''
  };


  constructor(private authService: AuthService, private route: Router) {
  }

  onLogin() {
    this.authService.login(this.loginData).subscribe({
      next: (res: any) => {
        console.log('Login successful', res);
        this.route.navigateByUrl('/');
      },
      error: (err) => {
        console.error('Login failed', err);
        alert(err?.error?.message || 'Login failed. Please try again.');
      }
    });
  }

  onRegister() {
    this.authService.register(this.registerData).subscribe({
      next: (res: any) => {
        console.log('Registration successful', res);
        this.route.navigateByUrl('/');
      },
      error: (err) => {
        console.error('Registration failed', err);
        if (err?.error?.message) {
          alert(err.error.message);
        } else if (err?.status === 400) {
          alert('Bad request. Please check the input fields.');
        } else if (err?.status === 409) {
          alert('Username or email already exists.');
        } else {
          alert('Registration failed. Please try again.');
        }
      }
    });
  }

}
