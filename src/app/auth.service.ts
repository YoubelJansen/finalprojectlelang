import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

// 1. Kita buat interface (cetakan) untuk respon login
interface LoginResponse {
  access_token: string;
  token_type: string;
  user: any; // Bisa dibuat lebih spesifik jika perlu
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient) { }

  login(credentials: {email: string, password: string}): Observable<any> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, credentials).pipe(
      // 2. Gunakan interface di sini agar TypeScript mengerti
      tap((response: LoginResponse) => { 
        // Sekarang response.access_token tidak akan merah lagi
        localStorage.setItem('auth_token', response.access_token);
        localStorage.setItem('auth_user', JSON.stringify(response.user));
      })
    );
  }

  register(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, userData);
  }

  logout() {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('auth_user');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('auth_token');
  }

  getUser() {
    const user = localStorage.getItem('auth_user');
    return user ? JSON.parse(user) : null;
  }
}