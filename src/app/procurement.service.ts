import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment'; // Menggunakan environment lebih baik

@Injectable({
  providedIn: 'root'
})
export class ProcurementService { // Nama kelas sudah disesuaikan
  // Menggunakan variabel dari environment lebih fleksibel
  private apiUrl = environment.apiUrl; 

  constructor(private http: HttpClient) { }

  // Fungsi untuk membuat header dengan token otentikasi
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('auth_token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json'
    });
  }

  // Fungsi untuk mengambil riwayat pengajuan dari API
  getRequests(): Observable<any> {
    // --- PERBAIKAN DI SINI ---
    // Menambahkan prefix '/employee' agar sesuai dengan route di backend
    const fullUrl = `${this.apiUrl}/employee/requests`;
    return this.http.get(fullUrl, { headers: this.getAuthHeaders() });
  }

  // Fungsi untuk membuat pengajuan baru ke API
  createRequest(requestData: any): Observable<any> {
    // --- PERBAIKAN DI SINI ---
    // Menambahkan prefix '/employee' agar sesuai dengan route di backend
    const fullUrl = `${this.apiUrl}/employee/requests`;
    return this.http.post(fullUrl, requestData, { headers: this.getAuthHeaders() });
  }
}
