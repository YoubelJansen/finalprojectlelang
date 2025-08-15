import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { tap } from 'rxjs/operators'; // Penting untuk menjalankan kode setelah API berhasil

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  /**
   * Helper untuk mendapatkan header otentikasi.
   * Ini memastikan token selalu terkirim pada setiap request yang terlindungi.
   */
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('auth_token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json'
    });
  }

  // Fungsi untuk login
  login(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials);
  }

  // Fungsi untuk register
  register(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, data);
  }

  /**
   * FUNGSI LOGOUT YANG SUDAH DIPERBAIKI
   * Sekarang ia memanggil API backend dan mengembalikan Observable,
   * yang akan menyelesaikan error 'subscribe does not exist'.
   */
  logout(): Observable<any> {
    // Panggil endpoint POST /logout di backend dengan token yang valid
    return this.http.post(`${this.apiUrl}/logout`, {}, { headers: this.getAuthHeaders() }).pipe(
      // 'tap' akan menjalankan kode tambahan SETELAH API berhasil merespon.
      tap(() => {
        // Hapus data dari localStorage HANYA JIKA logout di server berhasil.
        localStorage.removeItem('auth_token');
        localStorage.removeItem('user');
      })
    );
  }

  // Fungsi untuk mengambil data user
  getUser(): any | null {
    const userString = localStorage.getItem('user');
    return userString ? JSON.parse(userString) : null;
  }

  // Method untuk mengirim permintaan reset password
  forgotPassword(email: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/forgot-password`, { email });
  }

  /**
   * === METHOD BARU DITAMBAHKAN DI SINI ===
   * Mengirim data reset password ke server.
   * @param data Objek yang berisi: email, token, password, dan password_confirmation
   */
  resetPassword(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/reset-password`, data);
  }
}
