import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RestApiService {

    apiURL = 'http://127.0.0.1:8000/';
    constructor(private http: HttpClient) {}

    /*========================================
    CRUD Methods for consuming RESTful API
    =========================================*/

    // Http Options
    httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
    } 

    getCategories(): Observable<any> {
        return this.http.get<any>('api-v1/categories/')
        .pipe(
          retry(1),
          catchError(this.handleError) 
        )
    }

    getRetailers(): Observable<any> {
        return this.http.get<any>('api-v1/retailers/')
        .pipe(
          retry(1),
          catchError(this.handleError) 
        )
    } 

    getYears(): Observable<any> {
        return this.http.get<any>('api-v1/years/')
        .pipe(
          retry(1),
          catchError(this.handleError) 
        )
    }

    getRetailerRBData(category,year,aggregation,period): Observable<any> {
        return this.http.get<any>('api-v1/retailerwise_rb_forecast/'+category+'/'+year+'/'+aggregation+'/'+period+'/')
        .pipe(
          retry(1),
          catchError(this.handleError) 
        )
    }

    getCategoryGrowthData(category,year,aggregation,period): Observable<any> {
        return this.http.get<any>('api-v1/category_forecast/'+category+'/'+year+'/'+aggregation+'/'+period+'/')
        .pipe(
          retry(1),
          catchError(this.handleError) 
        )
    }

    getSpecificRetailerRBData(category,year,aggregation,period,retailer): Observable<any> {
        return this.http.get<any>('api-v1/specific_retailerwise_rb_forecast/'+category+'/'+year+'/'+aggregation+'/'+period+'/'+retailer+'/')
        .pipe(
          retry(1),
          catchError(this.handleError) 
        )
    }
    
    getAllSegmentRBData(category,year,aggregation,period,retailer): Observable<any> {
        return this.http.get<any>('api-v1/all_segmentwise_rb_forecast/'+category+'/'+year+'/'+aggregation+'/'+period+'/'+retailer+'/')
        .pipe(
          retry(1),
          catchError(this.handleError) 
        )
    }
    
    mapImportedData(category): Observable<any> {
        return this.http.get<any>('api-v1/mapdata/'+category+'/')
        .pipe(
          retry(1),
          catchError(this.handleError) 
        )
    }
    
    analyseImportedData(category,year,month): Observable<any> {
        return this.http.get<any>('api-v1/analysedata/'+category+'/'+year+'/'+month+'/')
        .pipe(
          retry(1),
          catchError(this.handleError) 
        )
    }

    buildSummaryData(category): Observable<any> {
        return this.http.get<any>('api-v1/build-summary/'+category+'/')
        .pipe(
          retry(1),
          catchError(this.handleError) 
        )
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
