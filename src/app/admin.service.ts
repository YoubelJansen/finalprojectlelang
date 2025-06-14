import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private apiUrl = 'http://127.0.0.1:8000/api/admin';

  constructor(private http: HttpClient) { }

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('auth_token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  /**
   * Mengambil daftar pengajuan yang sudah disetujui atasan dari API.
   */
  getApprovedRequests(): Observable<any> {
    // BENAR: Menggunakan this.apiUrl
    return this.http.get(`${this.apiUrl}/approved-requests`, { headers: this.getAuthHeaders() });
  }

  /**
   * Mengirim data untuk membuat tender baru ke API.
   */
  createTender(tenderData: any): Observable<any> {
    // BENAR: Menggunakan this.apiUrl
    return this.http.post(`${this.apiUrl}/tenders`, tenderData, { headers: this.getAuthHeaders() });
  }

  /**
   * Mengambil riwayat tender yang sudah dibuat dari API.
   */
  getTenders(): Observable<any> {
    // BENAR: Menggunakan this.apiUrl
    return this.http.get(`${this.apiUrl}/tenders`, { headers: this.getAuthHeaders() });
  }

  /**
   * Mengambil daftar semua vendor terdaftar dari API.
   */
  getVendors(): Observable<any> {
    // BENAR: Menggunakan this.apiUrl
    return this.http.get(`${this.apiUrl}/vendors`, { headers: this.getAuthHeaders() });
  }
}
