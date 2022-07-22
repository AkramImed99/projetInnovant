import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  public tweets: any;
  public searchForm: FormGroup;
  public error: string = '';
  public isEmpty: boolean = false;
  page: number = 1;
  countTweets: number = 0;
  tweetsPerPage: number = 4;


  constructor(public formBuilder: FormBuilder, private searchService: SearchService) {
    this.searchForm = this.formBuilder.group({
      searchField : new FormControl('', Validators.required)
    });
   }

  ngOnInit(): void {
  }


  search() {
    if(this.searchForm.controls.searchField.value == '') {
      this.error = 'Veuillez renseigner tous les champs';
      
    } else {
      this.error = '';
      this.searchService
      .searchData(this.searchForm.controls.searchField.value)
      .subscribe({
        next: response => {
          this.tweets = response;      
          console.log(this.tweets);
          // Check if array of tweets is empty
          if(this.tweets.length === 0) {
            this.isEmpty = true;
          }        
        },
        error: err => {
          console.error(err.error);
          
        }
      })
    }
  }

}
