import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SupervisorService {
  private apiUrl = 'http://127.0.0.1:8000/api/supervisor'; // URL API Khusus Supervisor

  constructor(private http: HttpClient) { }

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('auth_token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  // Mengambil pengajuan yang butuh verifikasi
  getPendingRequests(): Observable<any> {
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
    // src/app/supervisor.service.ts

  // ... (tambahkan di bawah method rejectRequest)

  // Mengambil seluruh riwayat pengajuan dari bawahan
  getHistory(): Observable<any> {
    return this.http.get(`${this.apiUrl}/history`, { headers: this.getAuthHeaders() });
  }
}