import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd, PRIMARY_OUTLET } from '@angular/router';
import { CategoryService, CategoryPPG } from '../../services/category.service';
import { Subscription } from 'rxjs';
import { RestApiService } from "../../services/rest-api.service";

import { filter } from 'rxjs/operators';
import { map } from 'rxjs/internal/operators';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent implements OnInit {

  public breadcrumbs;
  public title : string;
  public ppgs;
  public retailers;
  public years;
  subscription: Subscription;
  public selectedRetailer: string;
  public selectedRetailerValue: string;
  public selectedYear: string;
  public selectedAggregation: string;
  public selectedAggregationValue: string;
  public selectedCategory: string;
  public selectedCategoryName: string;
  public categoryservice;

  constructor(private changeDetectorRef: ChangeDetectorRef,
              public restApi: RestApiService,
              private activatedRoute: ActivatedRoute,
              private categoryService: CategoryService,
    private router: Router) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .pipe(map(() => this.activatedRoute))
      .pipe(map((route) => {
        while (route.firstChild) {
          route = route.firstChild;
        }
        return route;
      }))
      .pipe(filter(route => route.outlet === PRIMARY_OUTLET))
      .subscribe(route => {
        let snapshot = this.router.routerState.snapshot;
        let title = route.snapshot.data['title'];
        let parent = route.parent.snapshot.data['breadcrumb'];
        let child = route.snapshot.data['breadcrumb'];
        this.breadcrumbs = {};
        this.title = title;
        this.breadcrumbs = {
          "parentBreadcrumb": parent,
          "childBreadcrumb": child
        }
      });
      
     
  }
  
  
  public changeYear(selectedYear){
      
      this.selectedYear = selectedYear
      const currentItem:CategoryPPG = {
         category:this.selectedCategory,
         categoryname:this.selectedCategoryName,
         year:this.selectedYear,
         aggregation:this.selectedAggregationValue,
         /*retailer:Number(this.selectedRetailerValue)*/
      };

      this.categoryService.updateItem(currentItem);

  }

  public changeAggregate(selectedAggregation){
      
      if(selectedAggregation == 'percent_change'){
         this.selectedAggregationValue = 'percent_change'  
         this.selectedAggregation = '% Change'
      }
      else{
         this.selectedAggregationValue = 'absolute_dollor'  
         this.selectedAggregation = 'Absolute $ MM' 
      }
      const currentItem:CategoryPPG = {
         category:this.selectedCategory,
          categoryname:this.selectedCategoryName,
         year:this.selectedYear,
         aggregation:this.selectedAggregationValue,
         /*retailer:Number(this.selectedRetailerValue)*/
      };

      this.categoryService.updateItem(currentItem);

  }    
  public changeRetailer(selectedRetailerId,selectedRetailerName){
      this.selectedRetailer = selectedRetailerName
      /*this.selectedRetailerValue = selectedRetailerId
      const currentItem:CategoryPPG = {
         category:this.selectedCategory,
         categoryname:this.selectedCategoryName,
         year:this.selectedYear,
         aggregation:this.selectedAggregationValue,
         retailer:Number(this.selectedRetailerValue)
      };

      this.categoryService.updateItem(currentItem);*/
      this.changeDetectorRef.detectChanges();
      this.router.navigate(['/analysis/forecasting/retailerwise/retailer',selectedRetailerId]);
  }

  ngOnInit() { 
     
      
      
      this.restApi.getRetailers().subscribe((retailers: {}) => {
          this.retailers = retailers
          /*this.selectedRetailer = 'Select Retailer'
          this.selectedRetailerValue = null*/
          this.restApi.getYears().subscribe((years: {}) => {
              this.years = years
              this.selectedYear = years[0][0]
              this.selectedAggregation = '% Change'
              this.categoryservice = this.categoryService.getCategoryObject()
      
              this.selectedCategory = this.categoryservice.category
              this.selectedCategoryName = this.categoryservice.categoryname
              this.selectedAggregationValue = this.categoryservice.aggregation
              //this.selectedYear = this.categoryservice.year
              //this.selectedRetailer = this.categoryservice.retailer
              //console.log(this.selectedCategory+" - "+this.selectedYear+" - "+this.selectedRetailer)
              
              const currentItem:CategoryPPG = {
                 category:this.selectedCategory,
                 categoryname:this.selectedCategoryName,
                 year:this.selectedYear,
                 aggregation:'percent_change',
                 /*retailer:Number(this.selectedRetailerValue)*/
              };

              this.categoryService.updateItem(currentItem);
              
              
              this.getCategorySubscription(this.selectedRetailer)


          })
      })
      
       this.selectedRetailer = 'Select Retailer'
      
      
  }

  public getCategorySubscription(selectedRetailerText){
      this.subscription = this.categoryService.getCategory().subscribe(currentCategory => {
         
        if (currentCategory) {  
            this.selectedCategory = currentCategory.category
            this.selectedAggregationValue = currentCategory.aggregation
            this.selectedYear = currentCategory.year
            //var retailerName = this.retailers.find(x=> Number(x.retailer_id) == Number(currentCategory.retailer))           
            //this.selectedRetailer = (retailerName !== undefined) ? retailerName.retailer_name : 'Select Retailer'
            //this.selectedRetailer = 'Select Retailer'
        }
      });
  }

  ngOnDestroy() {  }

}
