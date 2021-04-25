import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import {NgbTabChangeEvent, NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { CategoryService, CategoryPPG } from '../../../shared/services/category.service';
import * as chartData from '../../../shared/data/chart/chartjs';
import { Subscription } from 'rxjs';
import { RestApiService } from "../../../shared/services/rest-api.service";

@Component({
  selector: 'app-forecasting',
  templateUrl: './forecasting.component.html',
  styleUrls: ['./forecasting.component.scss'],
  encapsulation:ViewEncapsulation.None    
})
export class ForecastingComponent implements OnInit {

    public lineChartOptions;
    public lineChartLabels;
    public lineChartType;
    public lineChartLegend;
    public lineChartData;
    public lineChartColors;   
    
    public qtrBarChartOptions;
    public qtrBarChartLabels;
    public qtrBarChartType;
    public qtrBarChartLegend;
    public qtrBarChartData;
    public qtrBarChartColors;
    
    public currentCategory;
    public previousYear; 
    public currentYear; 
    public nextYear; 
    public ppgContributionsCurrentYear; 
    public ppgContributionsNextYear; 
    public ppgContributionsPreviousYear; 
    public ppgContributionsCompare; 
    public retailerContributionsCurrentYear; 
    public retailerContributionsNextYear; 
    public retailerContributionsPreviousYear; 
    public retailerContributionsCompare; 
    
    public urtgrowth;
    public urtgrowthprevious;
    public rbgrowth;
    public rbgrowthprevious;
    public rbshare;
    public rbsharechange;
    public bgsuccess = "bg-success left-align";
    public bgwarning = "bg-secondary";
    subscription: Subscription;    
    
  constructor(private restApi: RestApiService, private categoryService: CategoryService, config: NgbModalConfig, private modalService: NgbModal) {  
      
        config.backdrop = 'static';
        config.keyboard = false;
        var lineChartData: Array<any> = [
          { data: ['26.2','-30.9','-19.7','-15.4','-27.5','42.3','9.1','1.6'], label: 'URT % Growth' },
          { data: ['27.6','-37.3','-25.7','-17.7','-29.3','32.5','22.0','18.2'], label: 'RB % Growth' },
          { data: ['19.2','16.8','15.7','17.2','18.7','15.7','17.6','20.0'], label: 'RB % Share' }
        ];
        var lineChartLabels: Array<any> = ["Q1 - 2020", "Q2 - 2020", "Q3 - 2020", "Q4 - 2020", "Q1 - 2021", "Q2 - 2021", "Q3 - 2021", "Q4 - 2021"];
        var lineChartOptions: any = {
          responsive: true,
          title: true,    
          scaleShowVerticalLines: false,
          maintainAspectRatio: false,
          scales: {
            yAxes: [{
               ticks: {
                   callback: function(value) {
                       return value + "%"
                   }
               },
               scaleLabel: {
                   display: true,
                   labelString: "Percentage"
               }
            }]
          },
          animationSteps: 60

        };
        var lineChartColors: Array<any> = [
          {
            backgroundColor: 'rgba(68, 102, 242, 0.3)',
            borderColor: "#4466f2",
            borderWidth: 2,
            lineTension: 0,
          },
          {
            backgroundColor: 'rgba(30, 166, 236, 0.3)',
            borderColor: "#1ea6ec",
            borderWidth: 2,
            lineTension: 0,
          },
          {
            backgroundColor: 'rgba(58, 17, 242, 0.4)',
            borderColor: "#4466f2",
            borderWidth: 2,
            lineTension: 0,
          }          
        ];
        var lineChartLegend = true;
        var lineChartType = 'line';
        

        this.lineChartOptions = lineChartOptions;
        this.lineChartLabels = lineChartLabels;
        this.lineChartType = lineChartType;
        this.lineChartLegend = lineChartLegend;
        this.lineChartData = lineChartData;
        this.lineChartColors = lineChartColors; 
      
        var qtrBarChartOptions: any = {
          scaleShowVerticalLines: false,
          maintainAspectRatio: false,
          responsive: true,
          legend: { 
              display: true,  
              position: 'top'
          },
          animationSteps: 60   
        };
        var qtrBarChartLabels: string[] = ["Q1 - 2020", "Q2 - 2020", "Q3 - 2020", "Q4 - 2020", "Q1 - 2021", "Q2 - 2021", "Q3 - 2021", "Q4 - 2021"];
        var qtrBarChartType = 'bar';
        var qtrBarChartLegend = true ;
        var qtrBarChartData: any[] = [
            { data: [0.21,-1.71,-1.28,-0.48,-0.47,-1.15,1.86,2.81], label: 'RB Share Change' }
        ];
        
        var qtrBarChartColors: Array<any> = [
          {
            backgroundColor: qtrBarChartData[0].data.map((value) => value < 0 ? 'pink' : 'green'),
            borderColor: qtrBarChartData[0].data.map((value) => value < 0 ? 'pink' : 'green'),
            borderWidth: 1,
          }
        ];

        this.qtrBarChartOptions = qtrBarChartOptions;
        this.qtrBarChartLabels = qtrBarChartLabels;
        this.qtrBarChartType = qtrBarChartType;
        this.qtrBarChartLegend = qtrBarChartLegend;
        this.qtrBarChartData = qtrBarChartData;
        this.qtrBarChartColors = qtrBarChartColors;  
              
        this.categoryService.getCategory().subscribe(currentCategory => {         
            if (currentCategory) { 
                
                this.currentCategory = currentCategory  
                this.currentYear = this.currentCategory.year - 1
                this.previousYear = this.currentCategory.year - 2
                this.nextYear = this.currentCategory.year
                if(this.currentCategory.hasOwnProperty('category') && this.currentCategory.hasOwnProperty('year') && this.currentCategory.hasOwnProperty('aggregation') && this.currentCategory.hasOwnProperty('retailer')){                    
                   if(this.currentCategory.category!="" && this.currentCategory.year!="" && this.currentCategory.aggregation !="" ){ 
                       console.log(this.currentCategory)
                       console.log("Category : " + this.currentCategory.category + "  ,  Year : " + this.currentCategory.year + "  ,    Aggregation : " + this.currentCategory.aggregation )
                       this.restApi.getRetailerRBData(this.currentCategory.category,this.currentCategory.year,this.currentCategory.aggregation,'quarterwise').subscribe((data: {}) => {
                            var retailerContributionsCurrentYear = data[this.currentCategory.year - 1]
                            this.retailerContributionsCurrentYear = retailerContributionsCurrentYear   
                            var retailerContributionsNextYear = data[this.currentCategory.year]
                            this.retailerContributionsNextYear = retailerContributionsNextYear 
                            var retailerContributionsPreviousYear = data[this.currentCategory.year-2]
                            this.retailerContributionsPreviousYear = retailerContributionsPreviousYear 

                            var retailercompare = [];

                            data[this.currentCategory.year].forEach( (element,index) => {
                                if(this.currentCategory.aggregation == 'percent_change')
                                    retailercompare.push({'retailer_name':element.retailer_name,'fy':(((element.fy_ds/this.retailerContributionsPreviousYear[index].fy_ds)-1)*100).toFixed(2)+'%'})
                                else
                                    retailercompare.push({'retailer_name':element.retailer_name,'fy':((element.fy_ds-this.retailerContributionsPreviousYear[index].fy_ds)/1000000).toFixed(2)+'$'})
                            });
                           this.retailerContributionsCompare = retailercompare

                           this.restApi.getAllSegmentRBData(this.currentCategory.category,this.currentCategory.year,this.currentCategory.aggregation,'quarterwise',1).subscribe((ppgdata: {}) => {
                                
                                var ppgContributionsCurrentYear = ppgdata[this.currentCategory.year-1]
                                this.retailerContributionsCurrentYear.forEach( (element,index) => {
                                    if(element.retailer_name == 'XAOC'){
                                        ppgContributionsCurrentYear.unshift({'ppg_id':element.retailer_id,'ppg_name':'Total RB','q1':element.q1,'q2':element.q2,'q3':element.q3,'q4':element.q4,'fy':element.fy,'fy_ds':element.fy_ds})
                                    } 
                                });
                                this.ppgContributionsCurrentYear = ppgContributionsCurrentYear 
                               
                                var ppgContributionsNextYear = ppgdata[this.currentCategory.year]
                                this.retailerContributionsNextYear.forEach( (element,index) => {
                                    if(element.retailer_name == 'XAOC'){
                                        ppgContributionsNextYear.unshift({'ppg_id':element.retailer_id,'ppg_name':'Total RB','q1':element.q1,'q2':element.q2,'q3':element.q3,'q4':element.q4,'fy':element.fy,'fy_ds':element.fy_ds})
                                    }
                                });
                                this.ppgContributionsNextYear = ppgContributionsNextYear 
                                var ppgContributionsPreviousYear = ppgdata[this.currentCategory.year-2]
                                this.retailerContributionsPreviousYear.forEach( (element,index) => {
                                    if(element.retailer_name == 'XAOC'){
                                        ppgContributionsPreviousYear.unshift({'ppg_id':element.retailer_id,'ppg_name':'Total RB','q1':element.q1,'q2':element.q2,'q3':element.q3,'q4':element.q4,'fy':element.fy,'fy_ds':element.fy_ds})
                                    }
                                });
                                this.ppgContributionsPreviousYear = ppgContributionsPreviousYear 

                                var ppgcompare = [];

                                this.ppgContributionsNextYear.forEach( (element,index) => {

                                    if(this.currentCategory.aggregation == 'percent_change')
                                        ppgcompare.push({'ppg_name':element.ppg_name,'fy':(((element.fy_ds/this.ppgContributionsPreviousYear[index].fy_ds)-1)*100).toFixed(2)+'%'}) 
                                    else
                                        ppgcompare.push({'ppg_name':element.ppg_name,'fy':((element.fy_ds-this.ppgContributionsPreviousYear[index].fy_ds)/1000000).toFixed(2)+'$'})

                                });
 

                               this.ppgContributionsCompare = ppgcompare

                            }) 
                            this.restApi.getCategoryGrowthData(this.currentCategory.category,this.currentCategory.year,this.currentCategory.aggregation,'quarterwise').subscribe((catgrowthdata: {}) => {
                                var urtgrowth = []
                                var urtgrowthprevious = []
                                urtgrowth.push(catgrowthdata[this.currentCategory.year][0])
                                urtgrowth.push(catgrowthdata[this.currentCategory.year-1][0])
                                urtgrowthprevious.push(catgrowthdata[this.currentCategory.year-2][0])
                                this.urtgrowth = urtgrowth
                                this.urtgrowthprevious = urtgrowthprevious
                                var rbgrowth = []
                                var rbgrowthprevious = []
                                this.retailerContributionsNextYear.forEach( (element,index) => {
                                    if(element.retailer_name == 'XAOC'){
                                        rbgrowth.push({'year':element.year,'q1':element.q1,'q2':element.q2,'q3':element.q3,'q4':element.q4,'q1_ds':element.q1_ds,'q2_ds':element.q2_ds,'q3_ds':element.q3_ds,'q4_ds':element.q4_ds,'fy':element.fy,'fy_ds':element.fy_ds})
                                    } 
                                });
                                this.retailerContributionsCurrentYear.forEach( (element,index) => {
                                    if(element.retailer_name == 'XAOC'){
                                        rbgrowth.push({'year':element.year,'q1':element.q1,'q2':element.q2,'q3':element.q3,'q4':element.q4,'q1_ds':element.q1_ds,'q2_ds':element.q2_ds,'q3_ds':element.q3_ds,'q4_ds':element.q4_ds,'fy':element.fy,'fy_ds':element.fy_ds})
                                    } 
                                });
                                this.retailerContributionsPreviousYear.forEach( (element,index) => {
                                    if(element.retailer_name == 'XAOC'){
                                        rbgrowthprevious.push({'year':element.year,'q1':element.q1,'q2':element.q2,'q3':element.q3,'q4':element.q4,'q1_ds':element.q1_ds,'q2_ds':element.q2_ds,'q3_ds':element.q3_ds,'q4_ds':element.q4_ds,'fy':element.fy,'fy_ds':element.fy_ds})
                                    } 
                                });
                                this.rbgrowth = rbgrowth
                                this.rbgrowthprevious = rbgrowthprevious
                                var rbshare = []
                                this.rbgrowth.forEach( (element,index) => {
                                    if(this.currentCategory.aggregation == "percent_change"){
                                        
                                        rbshare.push({'year':element.year,'q1':((element.q1_ds/this.urtgrowth[index].q1_ds)*100).toFixed(2)+'%','q2':((element.q2_ds/this.urtgrowth[index].q2_ds)*100).toFixed(2)+'%','q3':((element.q3_ds/this.urtgrowth[index].q3_ds)*100).toFixed(2)+'%','q4':((element.q4_ds/this.urtgrowth[index].q4_ds)*100).toFixed(2)+'%','fy':((element.fy_ds/this.urtgrowth[index].fy_ds)*100).toFixed(2)+'%'})
                                    }
                                    else{
                                        rbshare.push({'year':element.year,'q1':((element.q1_ds/this.urtgrowth[index].q1_ds)).toFixed(2)+'$','q2':((element.q2_ds/this.urtgrowth[index].q2_ds)).toFixed(2)+'$','q3':((element.q3_ds/this.urtgrowth[index].q3_ds)).toFixed(2)+'$','q4':((element.q4_ds/this.urtgrowth[index].q4_ds)).toFixed(2)+'$','fy':((element.fy_ds/this.urtgrowth[index].fy_ds)).toFixed(2)+'$'})
                                    }
                                });
                                this.rbshare = rbshare
                                
                                var rbsharechange = []                               
                                      
                                rbsharechange.push({'year':this.rbgrowth[0].year,'q1':((this.rbgrowth[0].q1_ds/this.urtgrowth[0].q1_ds)-(this.rbgrowthprevious[0].q1_ds/this.urtgrowthprevious[0].q1_ds)).toFixed(2),'q2':((this.rbgrowth[0].q2_ds/this.urtgrowth[0].q2_ds)-(this.rbgrowthprevious[0].q2_ds/this.urtgrowthprevious[0].q2_ds)).toFixed(2),'q3':((this.rbgrowth[0].q3_ds/this.urtgrowth[0].q3_ds)-(this.rbgrowthprevious[0].q3_ds/this.urtgrowthprevious[0].q3_ds)).toFixed(2),'q4':((this.rbgrowth[0].q4_ds/this.urtgrowth[0].q4_ds)-(this.rbgrowthprevious[0].q4_ds/this.urtgrowthprevious[0].q4_ds)).toFixed(2),'fy':((this.rbgrowth[0].fy_ds/this.urtgrowth[0].fy_ds)-(this.rbgrowthprevious[0].fy_ds/this.urtgrowthprevious[0].fy_ds)).toFixed(2)})
                                       
                                rbsharechange.push({'year':this.rbgrowth[1].year,'q1':((this.rbgrowth[1].q1_ds/this.urtgrowth[1].q1_ds)-(this.rbgrowth[0].q1_ds/this.urtgrowth[0].q1_ds)).toFixed(2),'q2':((this.rbgrowth[1].q2_ds/this.urtgrowth[1].q2_ds)-(this.rbgrowth[0].q2_ds/this.urtgrowth[0].q2_ds)).toFixed(2),'q3':((this.rbgrowth[1].q3_ds/this.urtgrowth[1].q3_ds)-(this.rbgrowth[0].q3_ds/this.urtgrowth[0].q3_ds)).toFixed(2),'q4':((this.rbgrowth[1].q4_ds/this.urtgrowth[1].q4_ds)-(this.rbgrowth[0].q4_ds/this.urtgrowth[0].q4_ds)).toFixed(2),'fy':((this.rbgrowth[1].fy_ds/this.urtgrowth[1].fy_ds)-(this.rbgrowth[0].fy_ds/this.urtgrowth[0].fy_ds)).toFixed(2)})
                                
                                this.rbsharechange = rbsharechange
                                
                            })
                        })
                        
                       
                                                                                                                                    
                    }
                    
                }
            }
      });  
  }
  public beforeChange($event: NgbTabChangeEvent) { }

  public chartClicked(e:any):void { }
 
  public chartHovered(e:any):void { } 

  ngOnInit(): void {    
      
  }
 
  openGraph(content) {
    this.modalService.open(content, {   size: 'xl', centered: true, backdropClass: 'light-blue-backdrop' });
  }
}
