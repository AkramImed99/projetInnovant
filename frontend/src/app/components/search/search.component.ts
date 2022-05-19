import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  public tweets :any;
  public searchForm: FormGroup;


  constructor(public formBuilder: FormBuilder, private http: HttpClient) {
    this.searchForm = this.formBuilder.group({
      searchField: ['']
    });
   }

  ngOnInit(): void {
  }

  search() {
    console.log('in search function');
    
  }

}
