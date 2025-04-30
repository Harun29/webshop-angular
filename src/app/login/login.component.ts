import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {NgIf} from '@angular/common';
import {UserService} from '../services/user.service';
import {Router} from '@angular/router';

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
    password: ''
  };

  constructor(private userService: UserService, private route: Router) {
  }

  onLogin() {
    this.userService.login(this.loginData).subscribe((res: any) =>{
      console.log('Login successful', res);
      sessionStorage.setItem('token', res.token);
      sessionStorage.setItem('user', res.user);
      this.route.navigateByUrl('/');
    });
  }

  onRegister() {
    console.log('Registering with', this.registerData);
  }
}
