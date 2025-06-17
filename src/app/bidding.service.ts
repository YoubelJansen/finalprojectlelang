// src/app/services/bidding.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BiddingService {
  private apiUrl = 'http://localhost:8000/api'; // URL base API Laravel Anda

  constructor(private http: HttpClient) { }

  submitBid(tenderId: number, priceOffer: number, token: string): Observable<any> {
    const endpoint = `${this.apiUrl}/tenders/${tenderId}/bids`;
    
    // Siapkan header otentikasi
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json'
    });
    
    const body = {
      price_offer: priceOffer
    };
    
    return this.http.post(endpoint, body, { headers: headers });
  }
}