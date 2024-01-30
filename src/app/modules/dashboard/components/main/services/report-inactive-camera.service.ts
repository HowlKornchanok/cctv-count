import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportInactiveCameraService {

  private apiUrl = 'your_report_api_url'; // Replace with your actual report API endpoint

  constructor(private http: HttpClient) {}

  reportIssue(locationData: any): Observable<any> {
    // You can customize the payload or headers as needed
    const headers = { 'Content-Type': 'application/json' };
    const payload = JSON.stringify(locationData);

    return this.http.post(this.apiUrl, payload, { headers });
  }
}