import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Registration } from './registration';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {
  private apiUrl = '/assets/Appfolder/registration.json';

  constructor(private http: HttpClient) { }

  getRegistrations(): Observable<Registration[]> {
    return this.http.get<Registration[]>(this.apiUrl);
  }

  getRegistration(id: number): Observable<Registration> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Registration>(url);
  }

  addRegistration(registration: Registration): Observable<Registration> {
    return this.http.post<Registration>(this.apiUrl, registration, httpOptions);
  }

  updateRegistration(registration: Registration): Observable<any> {
    const url = `${this.apiUrl}/${registration.id}`;
    return this.http.put(url, registration, httpOptions);
  }

  deleteRegistration(registration: Registration | number): Observable<Registration> {
    const id = typeof registration === 'number' ? registration : registration.id;
    const url = `${this.apiUrl}/${id}`;

    return this.http.delete<Registration>(url, httpOptions);
  }
}
