import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false,
})
export class LoginPage {
  email: string = '';
  password: string = '';

  constructor(private router: Router) {}

  onLogin() {
    const storedEmail = localStorage.getItem('user_email');
    const storedPassword = localStorage.getItem('user_password');

    if (this.email === storedEmail && this.password === storedPassword) {
      localStorage.setItem('is_logged_in', 'true');
      this.router.navigate(['/halamanutama']);
    } else {
      alert('Email atau password salah');
    }
  }
}
