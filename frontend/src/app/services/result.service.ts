import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/index';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ResultService {

  constructor(private httpClient: HttpClient) { }

  /**
   * get history of searches by user
   */
  getResults(userId: number): Observable<any> {
    return this.httpClient.get<any>(`http://localhost:3000/result/results/?userId=${userId}`);
  }

  /**
   * get results by keyword
   */
  getResultsByKeyword(keywordId : number) : Observable<any> {
    return this.httpClient.get<any>(`http://localhost:3000/result/resultsByKeyword/?keywordId=${keywordId}`);
  }
}
