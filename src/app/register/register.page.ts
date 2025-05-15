import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: false,
})
export class RegisterPage {
  email: string = '';
  password: string = '';

  constructor(private router: Router) {}

  onRegister() {
    localStorage.setItem('user_email', this.email);
    localStorage.setItem('user_password', this.password);
    alert('Registrasi berhasil!');
    this.router.navigate(['/login']);
  }
}
