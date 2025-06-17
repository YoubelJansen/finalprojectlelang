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

  // --- FUNGSI-FUNGSI YANG SUDAH ADA SEBELUMNYA ---
  getProfile(): Observable<any> {
    const token = localStorage.getItem('auth_token');
    const headers = new HttpHeaders({'Authorization': `Bearer ${token}`});
    return this.http.get(`${this.apiUrl}/vendor/profile`, { headers });
  }

  updateProfile(profileData: any): Observable<any> {
    const token = localStorage.getItem('auth_token');
    const headers = new HttpHeaders({'Authorization': `Bearer ${token}`});
    return this.http.post(`${this.apiUrl}/vendor/profile`, profileData, { headers });
  }
  
  submitDocuments(bidData: any): Observable<any> {
    const token = localStorage.getItem('auth_token');
    const headers = new HttpHeaders({'Authorization': `Bearer ${token}`});
    const formData = new FormData();
    formData.append('tender_id', bidData.tender_id);
    formData.append('administrative_document', bidData.administrative_document);
    formData.append('technical_document', bidData.technical_document);
    return this.http.post(`${this.apiUrl}/bids`, formData, { headers });
  }
  
  getTenderAndBidStatus(tenderId: number): Observable<any> {
    const token = localStorage.getItem('auth_token'); 
    const headers = new HttpHeaders({'Authorization': `Bearer ${token}`});
    return this.http.get(`${this.apiUrl}/tenders/${tenderId}/status`, { headers });
  }

  submitBid(tenderId: number, priceOffer: number): Observable<any> {
    const token = localStorage.getItem('auth_token');
    const headers = new HttpHeaders({'Authorization': `Bearer ${token}`});
    return this.http.post(`${this.apiUrl}/bids`, { tender_id: tenderId, price_offer: priceOffer }, { headers });
  }

  // --- FUNGSI BARU UNTUK MENGATASI ERROR ---
  /**
   * Mengambil jadwal aanwijzing untuk semua tender yang diikuti vendor.
   */
  getJadwalAanwijzing(): Observable<any> {
    const token = localStorage.getItem('auth_token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    // Panggil endpoint API yang sudah kita buat di Laravel
    return this.http.get(`${this.apiUrl}/vendor/jadwal-aanwijzing`, { headers });
  }
}
