import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ResultService } from 'src/app/services/result.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  userData: any;
  results :any;
  groupedResults: any;

  constructor(private resultService: ResultService, private authService: AuthService) { }

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

}
