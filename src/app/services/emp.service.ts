import { HttpClient, provideHttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmpService {

  constructor(private http: HttpClient) { }

  getEmployeeList() {
    return this.http.get('assets/data/emp-data.json');
  }
}
