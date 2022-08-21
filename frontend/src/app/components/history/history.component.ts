import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ResultService } from 'src/app/services/result.service';
//import * as _ from 'lodash';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  userData: any;
  results :any;

  constructor(private resultService: ResultService, private authService: AuthService) { }

  ngOnInit(): void {
    this.getResults();
  }

  getResults() {
    this.userData = this.authService.getUserDetails();
    this.userData = JSON.parse(this.userData);
  
    this.resultService.getResults(this.userData[0].id).subscribe((res: any) => {
      console.log(res);

      //var grouped = _.mapValues(_.groupBy(cars, 'make'),
     // clist => clist.map(car => _.omit(car, 'make')));
      
      this.results = res;
      
    })

  }

}
