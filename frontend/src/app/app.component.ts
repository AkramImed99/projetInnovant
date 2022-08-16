import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Twitter Data extraction';
  isLoggedIn : boolean = false;
  errorMessage: any;
  userData: any;
  
  loginForm = new FormGroup ({ email: new FormControl(), password: new FormControl()});
  signupForm = new FormGroup ({ firstName: new FormControl(), 
    lastName: new FormControl(), 
    email: new FormControl(), 
    password: new FormControl(), 
    confirmPassword: new FormControl()
  });


  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private apiService: ApiService) { }

  ngOnInit() :void {
    this.initLoginForm();
    this.initSignUpForm();
    this.isUserLoggedIn();  
    
    this.userData = this.authService.getUserDetails();
    this.userData = JSON.parse(this.userData);
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
        this.authService.setDataInLocalStorage('response', JSON.stringify(res));
        this.authService.setDataInLocalStorage('status', JSON.stringify(res.status));
        this.authService.setDataInLocalStorage('userData', JSON.stringify(res.data));
        this.authService.setDataInLocalStorage('token', res.token);       
       // this.userData = res.data;
        this.router.navigate(['/search']).then(() => {
          window.location.reload();
        });
      }
    })
    
  }


  onSubmitSignup() {
    console.log('submit signup');
    console.log(this.signupForm.value);
    
    this.apiService.postTypeRequest('user/register', this.signupForm.value).subscribe((res: any) => {
      if (res.status) {
        
        this.authService.setDataInLocalStorage('status', JSON.stringify(res.status));
        this.authService.setDataInLocalStorage('userData', JSON.stringify(res.data));  
        this.authService.setDataInLocalStorage('token', res.token);  
        this.userData =  res.data;
        this.router.navigate(['/search']).then(() => {
          window.location.reload();
        });
      } else { 
        console.log(res)
        alert(res.msg)
      }
    });
    
  }

  logout() {
    console.log('logout');
    
    this.isLoggedIn = false;
    this.authService.clearStorage();
    this.router.navigate([''])
    .then(() => {
      window.location.reload(); //Navigate and refresh page
    });
  }

  isUserLoggedIn() {
    if(this.authService.getUserDetails() != null) {
        this.isLoggedIn = true;
    }
  }


}
