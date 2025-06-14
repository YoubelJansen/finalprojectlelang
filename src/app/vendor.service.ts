import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class VendorService {
  // Rute API khusus untuk fitur-fitur Vendor
  private apiUrl = 'http://127.0.0.1:8000/api/vendor';

  constructor(private http: HttpClient) { }

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('auth_token');
    return new HttpHeaders({ 'Authorization': `Bearer ${token}` });
  }

  /**
   * Mengambil profil vendor yang sedang login.
   * Backend akan otomatis membuat profil kosong jika belum ada.
   */
  getProfile(): Observable<any> {
    return this.http.get(`${this.apiUrl}/profile`, { headers: this.getAuthHeaders() });
  }

  /**
   * Mengirim pembaruan data profil ke backend.
   */
  updateProfile(profileData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/profile`, profileData, { headers: this.getAuthHeaders() });
  }
}
