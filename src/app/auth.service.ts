import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  // Fungsi untuk login
  login(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials);
  }

  // Fungsi untuk register
  register(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, data);
  }

  // Fungsi untuk logout
  logout() {
    // Di sini seharusnya memanggil API logout, tapi untuk sementara kita bersihkan local storage
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user');
  }

  // Fungsi untuk mengambil data user
  getUser(): any | null {
    const userString = localStorage.getItem('user');
    return userString ? JSON.parse(userString) : null;
  }
}
