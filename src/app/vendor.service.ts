import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VendorService {
  private apiUrl = environment.apiUrl; 

  constructor(private http: HttpClient) { }

  /**
   * Helper function untuk mendapatkan header otentikasi.
   * Ini menghindari pengulangan kode dan memastikan token selalu terkirim.
   */
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('auth_token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json'
    });
  }

  // --- FUNGSI-FUNGSI YANG ANDA BUTUHKAN ---

  /**
   * Mengambil profil vendor yang sedang login.
   */
  getProfile(): Observable<any> {
    return this.http.get(`${this.apiUrl}/vendor/profile`, { headers: this.getAuthHeaders() });
  }

  /**
   * Memperbarui profil vendor.
   */
  updateProfile(profileData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/vendor/profile`, profileData, { headers: this.getAuthHeaders() });
  }
  
  /**
   * Mengirim dokumen penawaran.
   */
  submitDocuments(bidData: any): Observable<any> {
    const formData = new FormData();
    formData.append('tender_id', bidData.tender_id);
    formData.append('administrative_document', bidData.administrative_document);
    formData.append('technical_document', bidData.technical_document);
    // Untuk FormData, biarkan browser yang mengatur Content-Type
    const token = localStorage.getItem('auth_token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json'
    });
    return this.http.post(`${this.apiUrl}/bids`, formData, { headers });
  }
  
  /**
   * Mengambil status penawaran untuk satu tender.
   */
  getTenderAndBidStatus(tenderId: number): Observable<any> { 
    return this.http.get(`${this.apiUrl}/tenders/${tenderId}/status`, { headers: this.getAuthHeaders() });
  }

  /**
   * Mengirim harga penawaran.
   */
  submitBid(tenderId: number, priceOffer: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/bids`, { tender_id: tenderId, price_offer: priceOffer }, { headers: this.getAuthHeaders() });
  }

  /**
   * Mengambil jadwal aanwijzing untuk semua tender yang diikuti.
   */
  getJadwalAanwijzing(): Observable<any> {
    return this.http.get(`${this.apiUrl}/vendor/jadwal-aanwijzing`, { headers: this.getAuthHeaders() });
  }

  /**
   * Mengambil hasil semua tender yang diikuti.
   */
  getResults(): Observable<any> {
    return this.http.get(`${this.apiUrl}/vendor/results`, { headers: this.getAuthHeaders() });
  }
}
