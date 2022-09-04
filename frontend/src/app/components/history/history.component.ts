import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ResultService } from 'src/app/services/result.service';
import * as _ from 'lodash';
import { SearchService } from 'src/app/services/search.service';
import { Router } from '@angular/router';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  userData: any;
  results :any;
  groupedResults: any;
  resultsByKeyword: any;
  csvObject : any[]= [];
  data: any[] = [];

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

  /**
   * Export search history to csv file
   */
   exportData(keywordId : number, keyword : string) {
    console.log("just testing", keywordId);
    this.resultService.getResultsByKeyword(keywordId).subscribe((res:any) => {
      this.resultsByKeyword = res.data;
      
      const header = Object.keys(this.resultsByKeyword[0]);
      let csvObject = this.resultsByKeyword.map((row : any) => {
   
        header.map(fieldName => JSON.stringify(row.fieldName)).join(';');
      });

     
      console.log(JSON.stringify(this.resultsByKeyword[0].ref_id));
      
      csvObject.unshift(header.join(';'));
      let csvArray = csvObject.join('\r\n');

      
      var blob = new Blob([csvArray], {type: 'text/csv' });
      saveAs(blob, keyword + "-search.csv");

    });


  }

}


