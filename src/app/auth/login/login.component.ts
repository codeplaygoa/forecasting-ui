import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';
import Swal from 'sweetalert2';

type UserFields = 'username' | 'password';
type FormErrors = { [u in UserFields]: string };

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public newUser = false;
  public loginForm: FormGroup;
  public formErrors: FormErrors = {
    'username': '',
    'password': '',
  };
  public errorMessage: any;
  public loader: any;

  constructor(public authService: AuthService,
    private fb: FormBuilder,
    private router: Router,
    public ngZone: NgZone) {

    let user = JSON.parse(localStorage.getItem('user'));
        console.log(user)
        console.log('validate-token')
    if(user !== null && user.hasOwnProperty('token') && user.token !== null && user.token != '') {
      this.loader = true;
      this.authService.ValidateToken()
      .subscribe(data=>{
        if(data.status == 'success'){
          this.loader = false;
          this.ngZone.run(()=>this.router.navigate(['/analysis/forecasting'])); 
        }
        else
          this.loader = false;  
      })
    }  

    this.loginForm = fb.group({
      username: ['', [Validators.required]],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  showAlert(type,msg){
    Swal.fire({
      position: 'top-right',
      timerProgressBar: true,
      timer: 4000,
      toast: true,
      title: msg,
      icon: type,
      showConfirmButton: false
    })
  }

  // Simple Login
  login() {
    this.authService.SignIn(this.loginForm.value['username'], this.loginForm.value['password'])
    .subscribe(data=>{
      if(data.status == 'success') {
        this.authService.SetUserData(data.user[0]);
        this.ngZone.run(()=>this.router.navigate(['/analysis/forecasting']));
      }
      else {
        this.showAlert('error',data.message);
      }
      this.authService.showLoader = false;
    })
  }

}
