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

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('auth_token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json'
    });
  }

  getProfile(): Observable<any> {
    return this.http.get(`${this.apiUrl}/vendor/profile`, { headers: this.getAuthHeaders() });
  }

  updateProfile(profileData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/vendor/profile`, profileData, { headers: this.getAuthHeaders() });
  }
  
  /**
   * Mengirim dokumen penawaran.
   * URL diperbaiki agar sesuai dengan rute backend yang baru.
   */
  submitDocuments(bidData: any): Observable<any> {
    const formData = new FormData();
    formData.append('tender_id', bidData.tender_id);
    formData.append('administrative_document', bidData.administrative_document);
    formData.append('technical_document', bidData.technical_document);
    
    // URL baru yang sudah diproteksi untuk vendor
    const fullUrl = `${this.apiUrl}/vendor/bids`;
    return this.http.post(fullUrl, formData, { headers: this.getAuthHeaders() });
  }
  
  /**
   * Mengambil status penawaran untuk satu tender.
   * URL diperbaiki agar sesuai dengan rute backend yang baru.
   */
  getTenderAndBidStatus(tenderId: number): Observable<any> { 
    // URL baru yang sudah diproteksi untuk vendor
    const fullUrl = `${this.apiUrl}/vendor/tenders/${tenderId}/status`;
    return this.http.get(fullUrl, { headers: this.getAuthHeaders() });
  }

  /**
   * Mengirim harga penawaran.
   * URL diperbaiki agar sesuai dengan rute backend yang baru.
   */
  submitBid(tenderId: number, priceOffer: number): Observable<any> {
    // URL baru yang sudah diproteksi untuk vendor
    const fullUrl = `${this.apiUrl}/vendor/bids`;
    return this.http.post(fullUrl, { tender_id: tenderId, price_offer: priceOffer }, { headers: this.getAuthHeaders() });
  }

  getJadwalAanwijzing(): Observable<any> {
    return this.http.get(`${this.apiUrl}/vendor/jadwal-aanwijzing`, { headers: this.getAuthHeaders() });
  }

  getResults(): Observable<any> {
    return this.http.get(`${this.apiUrl}/vendor/results`, { headers: this.getAuthHeaders() });
  }
}