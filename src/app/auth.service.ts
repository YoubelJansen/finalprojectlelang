import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, private router: Router) { }

  register(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, data).pipe(
      tap(response => this.handleAuthSuccess(response))
    );
  }

  login(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials).pipe(
      tap(response => this.handleAuthSuccess(response))
    );
  }

  logout() {
    // Idealnya, panggil API logout di sini. Untuk sekarang, kita bersihkan sisi klien.
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user');
    this.router.navigateByUrl('/login', { replaceUrl: true });
  }

  // --- FUNGSI BARU UNTUK MENGATASI ERROR ---
  /**
   * Mengambil data pengguna yang tersimpan di localStorage.
   * @returns Objek user atau null jika tidak ada.
   */
  getUser(): any | null {
    const userString = localStorage.getItem('user');
    if (userString) {
      // Ubah string JSON kembali menjadi objek
      return JSON.parse(userString);
    }
    return null;
  }

  private handleAuthSuccess(response: any) {
    if (response.access_token && response.user) {
      localStorage.setItem('auth_token', response.access_token);
      // Simpan data user sebagai string JSON
      localStorage.setItem('user', JSON.stringify(response.user));
    }
  }
}
