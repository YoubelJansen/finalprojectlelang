import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private apiUrl = `${environment.apiUrl}/admin`; 

  constructor(private http: HttpClient) { }

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('auth_token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json'
    });
  }

  // --- FUNGSI LAMA (Sudah Benar) ---
  getTenderDetails(tenderId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/tenders/${tenderId}/details`, { headers: this.getAuthHeaders() });
  }

  setWinner(tenderId: number, bidId: number): Observable<any> {
    const body = { bid_id: bidId };
    return this.http.post(`${this.apiUrl}/tenders/${tenderId}/set-winner`, body, { headers: this.getAuthHeaders() });
  }

  getTenders(): Observable<any> {
    return this.http.get(`${this.apiUrl}/tenders`, { headers: this.getAuthHeaders() });
  }

  getApprovedRequests(): Observable<any> {
    return this.http.get(`${this.apiUrl}/approved-requests`, { headers: this.getAuthHeaders() });
  }

  createTender(tenderData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/tenders`, tenderData, { headers: this.getAuthHeaders() });
  }

  scheduleAanwijzing(tenderId: number, aanwijzingData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/tenders/${tenderId}/aanwijzing`, aanwijzingData, { headers: this.getAuthHeaders() });
  }

  // --- FUNGSI BARU UNTUK HALAMAN PILIH-TENDER ---
  /**
   * Mengambil daftar tender yang siap untuk penetapan pemenang.
   * Fungsi ini akan dipanggil oleh halaman 'pilih-tender'.
   */
  getTendersForSelection(): Observable<any> {
    // Memanggil endpoint yang sama dengan getTenders(). 
    // Penyaringan status ('Berlangsung', 'Evaluasi') akan dilakukan di frontend.
    return this.http.get(`${this.apiUrl}/tenders`, { headers: this.getAuthHeaders() });
  }
}
