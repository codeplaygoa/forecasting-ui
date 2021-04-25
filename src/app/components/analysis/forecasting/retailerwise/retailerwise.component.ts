import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { Router  , ActivatedRoute } from '@angular/router';
import {NgbTabChangeEvent, NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { CategoryService, CategoryPPG } from '../../../../shared/services/category.service';
import { Subscription } from 'rxjs';
import { RestApiService } from "../../../../shared/services/rest-api.service";

@Component({
  selector: 'app-retailerwise',
  templateUrl: './retailerwise.component.html',
  styleUrls: ['./retailerwise.component.scss']
})
export class RetailerwiseComponent implements OnInit {

    public currentCategory;
    public currentppg;
    public previousYear; 
    public currentYear; 
    public nextYear; 
    public ppgContributionsCurrentYearWise; 
    public ppgContributionsNextYearWise; 
    public ppgContributionsCurrentYear; 
    public ppgContributionsNextYear;
    
    public retailerContributionsCurrentYearWise; 
    public retailerContributionsNextYearWise; 
    public retailerContributionsCurrentYear; 
    public retailerContributionsNextYear;
    
    public urtgrowth;
    public rbgrowth;
    public rbshare;
    public rbsharechange;
    public retailerName;
    public retailerId;
    
    public bgsuccess = "bg-success left-align";
    public bgwarning = "bg-secondary";
    subscription: Subscription;    
    
  constructor(private route: ActivatedRoute, private restApi: RestApiService, private categoryService: CategoryService, config: NgbModalConfig, private modalService: NgbModal) {  
      
        config.backdrop = 'static';
        config.keyboard = false;
        
       
      
        this.categoryService.getCategory().subscribe(currentCategory => {         
            if (currentCategory) { 
                
                this.currentCategory = currentCategory  
                console.log(this.currentCategory)
                this.currentYear = this.currentCategory.year -1
                this.previousYear = this.currentCategory.year - 2
                this.nextYear = this.currentCategory.year
                if(this.currentCategory.hasOwnProperty('category') && this.currentCategory.hasOwnProperty('year') && this.currentCategory.hasOwnProperty('aggregation') && this.currentCategory.hasOwnProperty('retailer')){                    
                   if(this.currentCategory.category!="" && this.currentCategory.year!="" && this.currentCategory.aggregation !="" && this.currentCategory.retailer!=""){ this.restApi.getSpecificRetailerRBData(this.currentCategory.category,this.currentCategory.year,this.currentCategory.aggregation,'quarterwise',this.currentCategory.retailer).subscribe((data: {}) => {
                        var retailerContributionsCurrentYear = data[this.currentCategory.year - 1]
                        this.retailerContributionsCurrentYear = retailerContributionsCurrentYear   
                        var retailerContributionsNextYear = data[this.currentCategory.year]
                        this.retailerContributionsNextYear = retailerContributionsNextYear                         
                        
                       this.restApi.getAllSegmentRBData(this.currentCategory.category,this.currentCategory.year,this.currentCategory.aggregation,'quarterwise',this.currentCategory.retailer).subscribe((ppgdata: {}) => {
                            //console.log( ppgdata)
                            var ppgContributionsCurrentYear = ppgdata[this.currentCategory.year - 1]
                            this.retailerContributionsCurrentYear.forEach( (element,index) => {
                             //   if(element.retailer_name == this.retailerName){
                                    ppgContributionsCurrentYear.unshift({'ppg_id':element.retailer_id,'ppg_name':'Total RB','q1':element.q1,'q2':element.q2,'q3':element.q3,'q4':element.q4,'fy':element.fy,'fy_ds':element.fy_ds})
                              //  } 
                            });
                            this.ppgContributionsCurrentYear = ppgContributionsCurrentYear 
                            var ppgContributionsNextYear = ppgdata[this.currentCategory.year]
                            this.retailerContributionsNextYear.forEach( (element,index) => {
                              //  if(element.retailer_name == this.retailerName){
                                    ppgContributionsNextYear.unshift({'ppg_id':element.retailer_id,'ppg_name':'Total RB','q1':element.q1,'q2':element.q2,'q3':element.q3,'q4':element.q4,'fy':element.fy,'fy_ds':element.fy_ds})
                               // }
                            });
                            this.ppgContributionsNextYear = ppgContributionsNextYear                            
                           
                        }) 
                        
                    })
                    
                   this.restApi.getSpecificRetailerRBData(this.currentCategory.category,this.currentCategory.year,this.currentCategory.aggregation,'monthwise',this.currentCategory.retailer).subscribe((data: {}) => {
                        var retailerContributionsCurrentYearWise = data[this.currentCategory.year - 1]
                        this.retailerContributionsCurrentYearWise = retailerContributionsCurrentYearWise                         
                        var retailerContributionsNextYearWise = data[this.currentCategory.year - 1]
                        this.retailerContributionsNextYearWise = retailerContributionsNextYearWise 
                       this.restApi.getAllSegmentRBData(this.currentCategory.category,this.currentCategory.year,this.currentCategory.aggregation,'monthwise',this.currentCategory.retailer).subscribe((ppgdata: {}) => {
                            //console.log( ppgdata)
                            var ppgContributionsCurrentYearWise = ppgdata[this.currentCategory.year - 1]
                            this.retailerContributionsCurrentYearWise.forEach( (element,index) => {
                              //  if(element.retailer_name == this.retailerName){
                                    ppgContributionsCurrentYearWise.unshift({'ppg_id':element.retailer_id,'ppg_name':'Total RB','jan':element.jan,'feb':element.feb,'mar':element.mar,'apr':element.apr,'may':element.may,'jun':element.jun,'jul':element.jul,'aug':element.aug,'sep':element.sep,'oct':element.oct,'nov':element.nov,'dec':element.dec,'fy':element.fy,'fy_ds':element.fy_ds})
                              //  } 
                            });
                            this.ppgContributionsCurrentYearWise = ppgContributionsCurrentYearWise 
                            var ppgContributionsNextYearWise = ppgdata[this.currentCategory.year]
                            this.retailerContributionsNextYearWise.forEach( (element,index) => {
                              //  if(element.retailer_name == this.retailerName){
                                    ppgContributionsNextYearWise.unshift({'ppg_id':element.retailer_id,'ppg_name':'Total RB','jan':element.jan,'feb':element.feb,'mar':element.mar,'apr':element.apr,'may':element.may,'jun':element.jun,'jul':element.jul,'aug':element.aug,'sep':element.sep,'oct':element.oct,'nov':element.nov,'dec':element.dec,'fy':element.fy,'fy_ds':element.fy_ds})
                              //  } 
                            });
                            this.ppgContributionsNextYearWise = ppgContributionsNextYearWise
                        }) 
                        
                    })

                   }
                }
            }
      });  
    
  }

  ngOnInit(): void {
       
  }

}
