import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
// 1. Import 'environment'
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SupervisorService {
  // 2. Gunakan apiUrl dari environment dan tambahkan path khusus supervisor
  private apiUrl = `${environment.apiUrl}/supervisor`; 

  constructor(private http: HttpClient) { }

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('auth_token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  // Mengambil pengajuan yang butuh verifikasi
  getPendingRequests(): Observable<any> {
    // URL akan menjadi: https://elelang.my.id/api/supervisor/pending-requests
    return this.http.get(`${this.apiUrl}/pending-requests`, { headers: this.getAuthHeaders() });
  }

  // Menyetujui pengajuan
  approveRequest(requestId: number, data: { notes?: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/requests/${requestId}/approve`, data, { headers: this.getAuthHeaders() });
  }

  // Menolak pengajuan
  rejectRequest(requestId: number, data: { notes: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/requests/${requestId}/reject`, data, { headers: this.getAuthHeaders() });
  }

  // Mengambil seluruh riwayat pengajuan dari bawahan
  getHistory(): Observable<any> {
    return this.http.get(`${this.apiUrl}/history`, { headers: this.getAuthHeaders() });
  }
}
