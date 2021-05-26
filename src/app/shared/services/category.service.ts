import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

export interface CategoryPPG {
    category: string;
    categoryname: string;
    year: string;
    aggregation: string;
    /*retailer: number;*/
}

@Injectable({ 
  providedIn: 'root'
})
export class CategoryService {
  private categorySubject = new BehaviorSubject<Object>({});
  constructor() { }
    
    
    _CATEGORY:CategoryPPG = {
        category:'', 
        categoryname:'', 
        year: '',
        aggregation: '',
        /*retailer: null*/
    };
 
    updateItem(item: CategoryPPG) {
        
        this._CATEGORY.category = item.category;
        this._CATEGORY.categoryname = item.categoryname;
        this._CATEGORY.year = item.year;  
        this._CATEGORY.aggregation = item.aggregation;  
        /*this._CATEGORY.retailer = Number(item.retailer); */ 
        this.categorySubject.next(this._CATEGORY);
    }
 
    getCategory(): Observable<any> {
        return this.categorySubject.asObservable();       
    }

    getCategoryObject() {
        return this._CATEGORY;       
    }
    
}
