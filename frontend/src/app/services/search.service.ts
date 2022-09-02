import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/index';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})

export class SearchService {
    
    constructor(private httpClient: HttpClient) {}

    /**
     * get data from Twitter API
     */
    searchData(data: string) : Observable<any> {
        return this.httpClient.get<any>(`http://localhost:3000/?q=${data}`);
    }

    storeKeywordsAndTweets(keyword: string, tweets: any, userId: number) {
        return this.httpClient.post<any>(`http://localhost:3000/keyword/store_keywords/?userId=${userId}&keyword=${keyword}`, tweets);
    }

    /**
     * Delete keyword and its results from history
     */
    deleteKeywordAndResults(keywordId : number) {
        return this.httpClient.delete<any>(`http://localhost:3000/keyword/delete_keyword/?keywordId=${keywordId}`);
    }

}