import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PublicTenderService {
  // Perhatikan: API ini tidak menggunakan /admin atau /vendor
  private apiUrl = 'http://127.0.0.1:8000/api'; 

  constructor(private http: HttpClient) { }

  /**
   * Mengambil semua tender yang statusnya 'open' dari API publik.
   */
  getOpenTenders(): Observable<any> {
    return this.http.get(`${this.apiUrl}/tenders`);
  }
}
