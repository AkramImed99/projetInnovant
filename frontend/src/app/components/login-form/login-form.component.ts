import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  loginForm = new FormGroup ({ email: new FormControl(), password: new FormControl()});
  signupForm = new FormGroup ({ firstName: new FormControl(), 
    lastName: new FormControl(), 
    email: new FormControl(), 
    password: new FormControl(), 
    confirmPassword: new FormControl()
  });

  isLoggedIn: boolean = false;
  errorMessage: any;

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private apiService: ApiService) { }

  ngOnInit() : void {
    this.initLoginForm();
    this.initSignUpForm();
    this.isUserLogin();
  }

  initLoginForm() {
    this.loginForm = this.formBuilder.group({
      email : ['', [Validators.required, Validators.email]],
      password : ['', Validators.required]
    });
  }

  initSignUpForm() {
    this.signupForm = this.formBuilder.group({
      firstName : ['', Validators.required],
      lastName : ['', Validators.required],
      email : ['', [Validators.required, Validators.email]],
      password : ['', Validators.required]
    });
  }

  onSubmitLogin() {
    console.log('submit login');
    console.log('Your form data : ', this.loginForm.value);
   
    this.apiService.postTypeRequest('user/login', this.loginForm.value).subscribe((res: any) => {
     console.log(res);
     
      if (res.status) {
        this.authService.setDataInLocalStorage('userData', JSON.stringify(res.data));  
        this.authService.setDataInLocalStorage('token', res.token);  
        this.router.navigate(['search']);
      }
    })
    
  }


  onSubmitSignup() {
    console.log('submit signup');
    console.log(this.signupForm.value);
    
    this.apiService.postTypeRequest('user/register', this.signupForm.value).subscribe((res: any) => {
      if (res.status) { 
        console.log(res)
        this.authService.setDataInLocalStorage('userData', JSON.stringify(res.data));  
        this.authService.setDataInLocalStorage('token', res.token);  
        this.router.navigate(['']);
      } else { 
        console.log(res)
        alert(res.msg)
      }
    });
    
  }

  isUserLogin() {
    if(this.authService.getUserDetails() != null){
        this.isLoggedIn = true;
    }
  }
}
