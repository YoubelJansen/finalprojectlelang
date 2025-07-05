import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
// 1. Import 'environment'
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BiddingService {
  // 2. Gunakan apiUrl dari environment
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  // 3. Tambahkan helper untuk header agar konsisten
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('auth_token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json'
    });
  }

  /**
   * Mengirim penawaran untuk sebuah tender.
   * @param tenderId ID dari tender yang akan ditawar.
   * @param priceOffer Jumlah harga penawaran.
   */
  submitBid(tenderId: number, priceOffer: number): Observable<any> {
    // Endpoint sekarang menggunakan apiUrl yang benar
    const endpoint = `${this.apiUrl}/tenders/${tenderId}/bids`;
    
    const body = {
      price_offer: priceOffer
    };
    
    // Gunakan helper getAuthHeaders untuk mengirim permintaan
    return this.http.post(endpoint, body, { headers: this.getAuthHeaders() });
  }
}
