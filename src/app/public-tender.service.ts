import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
// 1. Import 'environment'
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PublicTenderService {
  
  // 2. Gunakan apiUrl dari environment, bukan localhost
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  /**
   * Mengambil semua tender yang statusnya 'open' dari API publik.
   */
  getOpenTenders(): Observable<any> {
    // URL ini sekarang akan menjadi https://elelang.my.id/api/tenders
    return this.http.get(`${this.apiUrl}/tenders`);
  }
}
