import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs/index';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})

export class SearchService {
    
    constructor(private httpClient: HttpClient) {}

    /**
     * get data from Twitter API
     */
    searchData(data: string) :Observable<any> {
        return this.httpClient.get<any>(`http://localhost:3000/?q=${data}`);
    }

}