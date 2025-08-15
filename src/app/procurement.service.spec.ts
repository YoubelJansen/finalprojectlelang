import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProcurementService {
  private apiUrl = 'http://127.0.0.1:8000/api'; // URL API Laravel

  constructor(private http: HttpClient) { }

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('auth_token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  getRequests(): Observable<any> {
    return this.http.get(`${this.apiUrl}/requests`, { headers: this.getAuthHeaders() });
  }

  createRequest(requestData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/requests`, requestData, { headers: this.getAuthHeaders() });
  }
}