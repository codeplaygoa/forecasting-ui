import { Injectable, HostListener, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, Subscriber, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
	providedIn: 'root'
})

export class AuthService {

  public showLoader: boolean = false;  
  public apiURL = 'http://127.0.0.1:4000/';
  public userData = null
  constructor(
      public router: Router,
      public ngZone: NgZone,
      private http: HttpClient){}
  
  // Http Options
  httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
  } 

  //Validate token
  ValidateToken():Observable<any> {
    return this.http.get(this.apiURL+'api-v1/validate-token/')
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }
    
  //Sign in
  SignIn(username,password):Observable<any> {
    this.showLoader = true;
    let data = new FormData();
    data.append('username',username);
    data.append('password',password);
    return this.http.post(this.apiURL+'api-v1/login/',data)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  //Set user
  SetUserData(user) {
    const userData = {
      email: user.email,
      displayName: user.displayName,
      firstName: user.firstName,
      lastName: user.lastName,
      token: user.token,
      uid: user.uid,
      designation: user.designation,
      photoURL: user.photoURL || 'assets/dashboeard/boy-2.png',
    };
      this.userData = userData
    localStorage.setItem('user',JSON.stringify(userData));
  }

  // Sign out
  SignOut() {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
    this.showLoader = false;
    localStorage.clear();
    this.router.navigate(['/auth/login']);
  }

  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return (user != null && user.emailVerified != false) ? true : false;
  }

  // Error handling 
  handleError(error) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
        // Get client-side error
        errorMessage = error.error.message;
    } else {
        // Get server-side error
        errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    //window.alert(errorMessage);
    return throwError(errorMessage);
  }
}