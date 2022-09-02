import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ResultService } from 'src/app/services/result.service';
import * as _ from 'lodash';
import { SearchService } from 'src/app/services/search.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  userData: any;
  results :any;
  groupedResults: any;

  constructor(private router: Router, private resultService: ResultService, private authService: AuthService, private searchService : SearchService) { }

  ngOnInit(): void {
    this.getResults();
  }

  getResults() {
    this.userData = this.authService.getUserDetails();
    this.userData = JSON.parse(this.userData);
  
    this.resultService.getResults(this.userData[0].id).subscribe((res: any) => {
      this.results = res.data;
      this.groupedResults = _.groupBy(this.results, result => result.keyword);
      this.groupedResults = _.values(this.groupedResults);
      console.log(this.groupedResults);
      
    });

  }

  deleteSearch(id : number) {
    console.log(id);
    if(confirm("Etes-vous sûr de supprimer cette recherche ?")) {
      this.searchService.deleteKeywordAndResults(id).subscribe((res:any) => {
        this.router.navigate(['/history']).then(() => {
          window.location.reload();
        });
      });

    }
  }

}
