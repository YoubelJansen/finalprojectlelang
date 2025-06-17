import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  /**
   * Helper function untuk mendapatkan header otentikasi.
   * Ini adalah bagian terpenting untuk menghindari pengulangan kode dan memastikan token selalu terkirim.
   */
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('auth_token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  // --- FUNGSI-FUNGSI YANG ANDA BUTUHKAN ---

  /**
   * Mengambil daftar pengajuan yang sudah disetujui atasan.
   */
  getApprovedRequests(): Observable<any> {
    return this.http.get(`${this.apiUrl}/admin/approved-requests`, { headers: this.getAuthHeaders() });
  }

  /**
   * Mengirim data untuk membuat tender baru ke API.
   * Fungsi ini sekarang PASTI menyertakan token.
   */
  createTender(tenderData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/admin/tenders`, tenderData, { headers: this.getAuthHeaders() });
  }

  /**
   * Mengambil riwayat semua tender.
   */
  getTenders(): Observable<any> {
    return this.http.get(`${this.apiUrl}/admin/tenders`, { headers: this.getAuthHeaders() });
  }

  /**
   * Mengambil detail lengkap satu tender.
   */
  getTenderDetails(tenderId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/admin/tenders/${tenderId}/details`, { headers: this.getAuthHeaders() });
  }

  /**
   * Menyimpan jadwal Aanwijzing.
   */
  scheduleAanwijzing(tenderId: number, data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/admin/tenders/${tenderId}/aanwijzing`, data, { headers: this.getAuthHeaders() });
  }
}
