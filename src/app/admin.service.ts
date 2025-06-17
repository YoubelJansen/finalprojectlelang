import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment'; // Menggunakan environment untuk URL API

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  // Menggunakan apiUrl dari environment file, ini praktik terbaik
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  /**
   * Helper function untuk mendapatkan header otentikasi.
   * Ini menghindari pengulangan kode.
   */
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('auth_token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  // --- FUNGSI-FUNGSI YANG SUDAH ADA ---

  getApprovedRequests(): Observable<any> {
    return this.http.get(`${this.apiUrl}/admin/approved-requests`, { headers: this.getAuthHeaders() });
  }

  createTender(tenderData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/admin/tenders`, tenderData, { headers: this.getAuthHeaders() });
  }

  getTenders(): Observable<any> {
    return this.http.get(`${this.apiUrl}/admin/tenders`, { headers: this.getAuthHeaders() });
  }

  getVendors(): Observable<any> {
    return this.http.get(`${this.apiUrl}/admin/vendors`, { headers: this.getAuthHeaders() });
  }


  // --- FUNGSI-FUNGSI BARU ---

  /**
   * Mengambil detail lengkap sebuah tender, termasuk semua bids.
   * @param tenderId ID dari tender yang ingin dilihat.
   */
  getTenderDetails(tenderId: number): Observable<any> {
    // Panggil endpoint API yang sudah kita buat di Laravel
    return this.http.get(`${this.apiUrl}/admin/tenders/${tenderId}/details`, { headers: this.getAuthHeaders() });
  }

  /**
   * Menyimpan atau memperbarui jadwal Aanwijzing untuk sebuah tender.
   * @param tenderId ID dari tender.
   * @param data Data jadwal (waktu, link, deskripsi).
   */
  scheduleAanwijzing(tenderId: number, data: any): Observable<any> {
    // Panggil endpoint API yang sudah kita buat di Laravel
    return this.http.post(`${this.apiUrl}/admin/tenders/${tenderId}/aanwijzing`, data, { headers: this.getAuthHeaders() });
  }
}
