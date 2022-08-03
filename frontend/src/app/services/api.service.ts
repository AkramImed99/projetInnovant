import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseUrl = 'http://localhost:3000/';

  constructor(private httpClient: HttpClient) {
  }



  getTypeRequest(url: string) {
    return this.httpClient.get(`${this.baseUrl}${url}`).pipe(map(res => {
      return res;
    }));
  }

  postTypeRequest(url: string, payload: any) {
    return this.httpClient.post(`${this.baseUrl}${url}`, payload).pipe(map(res => {
      return res;
    }));
  }

  putTypeRequest(url: string, payload: any) {
    return this.httpClient.put(`${this.baseUrl}${url}`, payload).pipe(map(res => {
      return res;
    }));
  }

}