import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/index';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})

export class SearchService {
    
    constructor(private httpClient: HttpClient) {}

    /**
     * get data from Twitter API
     */
    searchData(data : any) {
        return this.httpClient.get('url'+ data);
    }

}