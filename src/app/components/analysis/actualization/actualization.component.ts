import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CategoryService, CategoryPPG } from '../../../shared/services/category.service';

@Component({
  selector: 'app-actualization',
  templateUrl: './actualization.component.html',
  styleUrls: ['./actualization.component.scss']
})
export class ActualizationComponent implements OnInit {

   // lineGraph Chart
  public actuals = [];
  public forecast = [];
  public currentppg;
  subscription: Subscription;    
    
  constructor(private categoryService: CategoryService) { 
  
    this.subscription = this.categoryService.getCategory().subscribe(currentCategory => {
        this.currentppg = currentCategory.ppg       
        
        if(currentCategory){
           if(currentCategory.ppg == "Core 300"){
               var actuals = [
                   {
                        "drivers": "YAGO",
                        "july2020actcontributiondollar": " $8,649,941 ",
                        "july2020actcontributionpct": "-"
                    },
                    {
                        "drivers": "Base Trend",
                        "july2020actcontributiondollar": " $ -    ",
                        "july2020actcontributionpct": "0.0%"
                    },
                    {
                        "drivers": "RegPrc",
                        "july2020actcontributiondollar": " $(328,939)",
                        "july2020actcontributionpct": "-3.8%"
                    },
                    {
                        "drivers": "Trade",
                        "july2020actcontributiondollar": " $116,995 ",
                        "july2020actcontributionpct": "1.4%"
                    },
                    {
                        "drivers": "Ad St Media",
                        "july2020actcontributiondollar": " $1,202 ",
                        "july2020actcontributionpct": "0.0%"
                    },
                    {
                        "drivers": "TDP",
                        "july2020actcontributiondollar": " $(312,028)",
                        "july2020actcontributionpct": "-3.6%"
                    },
                    {
                        "drivers": "Competitor",
                        "july2020actcontributiondollar": " $(39,099)",
                        "july2020actcontributionpct": "-0.5%"
                    },
                    {
                        "drivers": "Innovation",
                        "july2020actcontributiondollar": " $198,655 ",
                        "july2020actcontributionpct": "2.3%"
                    },
                    {
                        "drivers": "Covid Impact",
                        "july2020actcontributiondollar": " $687,815 ",
                        "july2020actcontributionpct": "8.0%"
                    },
                    {
                        "drivers": "Pre March Covid Miss",
                        "july2020actcontributiondollar": " $15,110 ",
                        "july2020actcontributionpct": "0.2%"
                    },
                    {
                        "drivers": "CY",
                        "july2020actcontributiondollar": " $8,989,653 ",
                        "july2020actcontributionpct": "3.9%"
                    },
                    {
                        "drivers": "Change",
                        "july2020actcontributiondollar": " $339,712 ",
                        "july2020actcontributionpct": "3.9%"
                    }
               ];
               this.actuals = actuals;
               var forecast = [
                   {
                        "drivers": "YAGO",
                        "july2020fccontributiondollar": " $8,649,941 ",
                        "july2020fccontributionpct": "-"
                    },
                    {
                        "drivers": "Base Trend",
                        "july2020fccontributiondollar": " $ -    ",
                        "july2020fccontributionpct": "0.0%"
                    },
                    {
                        "drivers": "RegPrc",
                        "july2020fccontributiondollar": " $(326,093)",
                        "july2020fccontributionpct": "-3.8%"
                    },
                    {
                        "drivers": "Trade",
                        "july2020fccontributiondollar": " $99,621 ",
                        "july2020fccontributionpct": "1.2%"
                    },
                    {
                        "drivers": "Ad St Media",
                        "july2020fccontributiondollar": " $(1,158)",
                        "july2020fccontributionpct": "0.0%"
                    },
                    {
                        "drivers": "TDP",
                        "july2020fccontributiondollar": " $(260,917)",
                        "july2020fccontributionpct": "-3.0%"
                    },
                    {
                        "drivers": "Competitor",
                        "july2020fccontributiondollar": " $(14,736)",
                        "july2020fccontributionpct": "-0.2%"
                    },
                    {
                        "drivers": "Innovation",
                        "july2020fccontributiondollar": " $195,446 ",
                        "july2020fccontributionpct": "2.3%"
                    },
                    {
                        "drivers": "Covid Impact",
                        "july2020fccontributiondollar": " $687,815 ",
                        "july2020fccontributionpct": "8.0%"
                    },
                    {
                        "drivers": "Pre March Covid Miss",
                        "july2020fccontributiondollar": " $ -    ",
                        "july2020fccontributionpct": "0.0%"
                    },
                    {
                        "drivers": "CY",
                        "july2020fccontributiondollar": " $9,029,919 ",
                        "july2020fccontributionpct": "4.4%"
                    },
                    {
                        "drivers": "Change",
                        "july2020fccontributiondollar": " $379,978 ",
                        "july2020fccontributionpct": "4.4%"
                    }
               ];
               this.forecast = forecast;
           }
           else if(currentCategory.ppg == "FamilySize"){
                var actuals = [
                   {
                        "drivers": "YAGO",
                        "july2020actcontributiondollar": " $2,411,818 ",
                        "july2020actcontributionpct": "-"
                    },
                    {
                        "drivers": "Base Trend",
                        "july2020actcontributiondollar": " $ -    ",
                        "july2020actcontributionpct": "0.0%"
                    },
                    {
                        "drivers": "RegPrc",
                        "july2020actcontributiondollar": " $591 ",
                        "july2020actcontributionpct": "0.0%"
                    },
                    {
                        "drivers": "Trade",
                        "july2020actcontributiondollar": " $15,951 ",
                        "july2020actcontributionpct": "0.7%"
                    },
                    {
                        "drivers": "Ad St Media",
                        "july2020actcontributiondollar": " $1,945 ",
                        "july2020actcontributionpct": "0.1%"
                    },
                    {
                        "drivers": "TDP",
                        "july2020actcontributiondollar": " $209,400 ",
                        "july2020actcontributionpct": "8.7%"
                    },
                    {
                        "drivers": "Competitor",
                        "july2020actcontributiondollar": " $10,471 ",
                        "july2020actcontributionpct": "0.4%"
                    },
                    {
                        "drivers": "Innovation",
                        "july2020actcontributiondollar": " $277,686 ",
                        "july2020actcontributionpct": "11.5%"
                    },
                    {
                        "drivers": "Covid Impact",
                        "july2020actcontributiondollar": " $1,390,952 ",
                        "july2020actcontributionpct": "57.7%"
                    },
                    {
                        "drivers": "Pre March Covid Miss",
                        "july2020actcontributiondollar": " $375,423 ",
                        "july2020actcontributionpct": "15.6%"
                    },
                    {
                        "drivers": "CY",
                        "july2020actcontributiondollar": " $4,694,237 ",
                        "july2020actcontributionpct": "94.6%"
                    },
                    {
                        "drivers": "Change",
                        "july2020actcontributiondollar": " $2,282,419 ",
                        "july2020actcontributionpct": "94.6%"
                    }
                ];
                this.actuals = actuals;
                var forecast = [
                    {
                        "drivers": "YAGO",
                        "july2020fccontributiondollar": " $2,411,818 ",
                        "july2020fccontributionpct": "-"
                    },
                    {
                        "drivers": "Base Trend",
                        "july2020fccontributiondollar": " $(867)",
                        "july2020fccontributionpct": "0.0%"
                    },
                    {
                        "drivers": "RegPrc",
                        "july2020fccontributiondollar": " $(15,634)",
                        "july2020fccontributionpct": "-0.6%"
                    },
                    {
                        "drivers": "Trade",
                        "july2020fccontributiondollar": " $32,805 ",
                        "july2020fccontributionpct": "1.4%"
                    },
                    {
                        "drivers": "Ad St Media",
                        "july2020fccontributiondollar": " $(618)",
                        "july2020fccontributionpct": "0.0%"
                    },
                    {
                        "drivers": "TDP",
                        "july2020fccontributiondollar": " $194,112 ",
                        "july2020fccontributionpct": "8.0%"
                    },
                    {
                        "drivers": "Competitor",
                        "july2020fccontributiondollar": " $(3,742)",
                        "july2020fccontributionpct": "-0.2%"
                    },
                    {
                        "drivers": "Innovation",
                        "july2020fccontributiondollar": " $255,552 ",
                        "july2020fccontributionpct": "10.6%"
                    },
                    {
                        "drivers": "Covid Impact",
                        "july2020fccontributiondollar": " $1,390,952 ",
                        "july2020fccontributionpct": "57.7%"
                    },
                    {
                        "drivers": "Pre March Covid Miss",
                        "july2020fccontributiondollar": " $ -    ",
                        "july2020fccontributionpct": "0.0%"
                    },
                    {
                        "drivers": "CY",
                        "july2020fccontributiondollar": " $4,265,246 ",
                        "july2020fccontributionpct": "76.8%"
                    },
                    {
                        "drivers": "Change",
                        "july2020fccontributiondollar": " $1,853,428 ",
                        "july2020fccontributionpct": "76.8%"
                    }
                ];
                this.forecast = forecast;
           }
           else if(currentCategory.ppg == "PeekFreans"){
                var actuals = [
                   {
                        "drivers": "YAGO",
                        "july2020actcontributiondollar": " $2,690,542 ",
                        "july2020actcontributionpct": "-"
                    },
                    {
                        "drivers": "Base Trend",
                        "july2020actcontributiondollar": " $ -    ",
                        "july2020actcontributionpct": "0.0%"
                    },
                    {
                        "drivers": "RegPrc",
                        "july2020actcontributiondollar": " $123,811 ",
                        "july2020actcontributionpct": "4.6%"
                    },
                    {
                        "drivers": "Trade",
                        "july2020actcontributiondollar": " $(21,705)",
                        "july2020actcontributionpct": "-0.8%"
                    },
                    {
                        "drivers": "Ad St Media",
                        "july2020actcontributiondollar": " $(0)",
                        "july2020actcontributionpct": "0.0%"
                    },
                    {
                        "drivers": "TDP",
                        "july2020actcontributiondollar": " $253,611 ",
                        "july2020actcontributionpct": "9.4%"
                    },
                    {
                        "drivers": "Competitor",
                        "july2020actcontributiondollar": " $(1,657)",
                        "july2020actcontributionpct": "-0.1%"
                    },
                    {
                        "drivers": "Innovation",
                        "july2020actcontributiondollar": " $ -    ",
                        "july2020actcontributionpct": "0.0%"
                    },
                    {
                        "drivers": "Covid Impact",
                        "july2020actcontributiondollar": " $624,593 ",
                        "july2020actcontributionpct": "23.2%"
                    },
                    {
                        "drivers": "Pre March Covid Miss",
                        "july2020actcontributiondollar": " $(1,060,764)",
                        "july2020actcontributionpct": "-39.4%"
                    },
                    {
                        "drivers": "CY",
                        "july2020actcontributiondollar": " $2,608,431 ",
                        "july2020actcontributionpct": "-3.1%"
                    },
                    {
                        "drivers": "Change",
                        "july2020actcontributiondollar": " $(82,111)",
                        "july2020actcontributionpct": "-3.1%"
                    }
                ];
                this.actuals = actuals;
                var forecast = [
                   {
                        "drivers": "YAGO",
                        "july2020fccontributiondollar": " $2,690,542 ",
                        "july2020fccontributionpct": "-"
                    },
                    {
                        "drivers": "Base Trend",
                        "july2020fccontributiondollar": " $ -    ",
                        "july2020fccontributionpct": "0.0%"
                    },
                    {
                        "drivers": "RegPrc",
                        "july2020fccontributiondollar": " $123,693 ",
                        "july2020fccontributionpct": "4.6%"
                    },
                    {
                        "drivers": "Trade",
                        "july2020fccontributiondollar": " $(14,464)",
                        "july2020fccontributionpct": "-0.5%"
                    },
                    {
                        "drivers": "Ad St Media",
                        "july2020fccontributiondollar": " $0 ",
                        "july2020fccontributionpct": "0.0%"
                    },
                    {
                        "drivers": "TDP",
                        "july2020fccontributiondollar": " $221,035 ",
                        "july2020fccontributionpct": "8.2%"
                    },
                    {
                        "drivers": "Competitor",
                        "july2020fccontributiondollar": " $(1,655)",
                        "july2020fccontributionpct": "-0.1%"
                    },
                    {
                        "drivers": "Innovation",
                        "july2020fccontributiondollar": " $(0)",
                        "july2020fccontributionpct": "0.0%"
                    },
                    {
                        "drivers": "Covid Impact",
                        "july2020fccontributiondollar": " $624,593 ",
                        "july2020fccontributionpct": "23.2%"
                    },
                    {
                        "drivers": "Pre March Covid Miss",
                        "july2020fccontributiondollar": " $ -    ",
                        "july2020fccontributionpct": "0.0%"
                    },
                    {
                        "drivers": "CY",
                        "july2020fccontributiondollar": " $3,643,744 ",
                        "july2020fccontributionpct": "35.4%"
                    },
                    {
                        "drivers": "Change",
                        "july2020fccontributiondollar": " $953,202 ",
                        "july2020fccontributionpct": "35.4%"
                    }
                ];
                this.forecast = forecast;
           }
           else if(currentCategory.ppg == "Dads"){
                var actuals = [
                    {
                        "drivers": "YAGO",
                        "july2020actcontributiondollar": " $1,216,003 ",
                        "july2020actcontributionpct": "-"
                    },
                    {
                        "drivers": "Base Trend",
                        "july2020actcontributiondollar": " $ -    ",
                        "july2020actcontributionpct": "0.0%"
                    },
                    {
                        "drivers": "RegPrc",
                        "july2020actcontributiondollar": " $(50,727)",
                        "july2020actcontributionpct": "-4.2%"
                    },
                    {
                        "drivers": "Trade",
                        "july2020actcontributiondollar": " $10,389 ",
                        "july2020actcontributionpct": "0.9%"
                    },
                    {
                        "drivers": "Ad St Media",
                        "july2020actcontributiondollar": " $ -    ",
                        "july2020actcontributionpct": "0.0%"
                    },
                    {
                        "drivers": "TDP",
                        "july2020actcontributiondollar": " $(75,695)",
                        "july2020actcontributionpct": "-6.2%"
                    },
                    {
                        "drivers": "Competitor",
                        "july2020actcontributiondollar": " $(1,435)",
                        "july2020actcontributionpct": "-0.1%"
                    },
                    {
                        "drivers": "Innovation",
                        "july2020actcontributiondollar": " $ -    ",
                        "july2020actcontributionpct": "0.0%"
                    },
                    {
                        "drivers": "Covid Impact",
                        "july2020actcontributiondollar": " $200,852 ",
                        "july2020actcontributionpct": "16.5%"
                    },
                    {
                        "drivers": "Pre March Covid Miss",
                        "july2020actcontributiondollar": " $119,522 ",
                        "july2020actcontributionpct": "9.8%"
                    },
                    {
                        "drivers": "CY",
                        "july2020actcontributiondollar": " $1,418,909 ",
                        "july2020actcontributionpct": "16.7%"
                    },
                    {
                        "drivers": "Change",
                        "july2020actcontributiondollar": " $202,906 ",
                        "july2020actcontributionpct": "16.7%"
                    }
                ];
                this.actuals = actuals;
                var forecast = [
                   {
                        "drivers": "YAGO",
                        "july2020fccontributiondollar": " $1,216,003 ",
                        "july2020fccontributionpct": "-"
                    },
                    {
                        "drivers": "Base Trend",
                        "july2020fccontributiondollar": " $ -    ",
                        "july2020fccontributionpct": "0.0%"
                    },
                    {
                        "drivers": "RegPrc",
                        "july2020fccontributiondollar": " $(84,639)",
                        "july2020fccontributionpct": "-7.0%"
                    },
                    {
                        "drivers": "Trade",
                        "july2020fccontributiondollar": " $15,917 ",
                        "july2020fccontributionpct": "1.3%"
                    },
                    {
                        "drivers": "Ad St Media",
                        "july2020fccontributiondollar": " $ -    ",
                        "july2020fccontributionpct": "0.0%"
                    },
                    {
                        "drivers": "TDP",
                        "july2020fccontributiondollar": " $(74,367)",
                        "july2020fccontributionpct": "-6.1%"
                    },
                    {
                        "drivers": "Competitor",
                        "july2020fccontributiondollar": " $(1,047)",
                        "july2020fccontributionpct": "-0.1%"
                    },
                    {
                        "drivers": "Innovation",
                        "july2020fccontributiondollar": " $ -    ",
                        "july2020fccontributionpct": "0.0%"
                    },
                    {
                        "drivers": "Covid Impact",
                        "july2020fccontributiondollar": " $200,852 ",
                        "july2020fccontributionpct": "16.5%"
                    },
                    {
                        "drivers": "Pre March Covid Miss",
                        "july2020fccontributiondollar": " $ -    ",
                        "july2020fccontributionpct": "0.0%"
                    },
                    {
                        "drivers": "CY",
                        "july2020fccontributiondollar": " $1,272,719 ",
                        "july2020fccontributionpct": "4.7%"
                    },
                    {
                        "drivers": "Change",
                        "july2020fccontributiondollar": " $56,716 ",
                        "july2020fccontributionpct": "4.7%"
                    }
                ];
                this.forecast = forecast;
           }
           else if(currentCategory.ppg == "Kids"){
               var actuals = [
                   {
                        "drivers": "YAGO",
                        "july2020actcontributiondollar": " $2,774,761 ",
                        "july2020actcontributionpct": "-"
                    },
                    {
                        "drivers": "Base Trend",
                        "july2020actcontributiondollar": " $ -    ",
                        "july2020actcontributionpct": "0.0%"
                    },
                    {
                        "drivers": "RegPrc",
                        "july2020actcontributiondollar": " $(113,332)",
                        "july2020actcontributionpct": "-4.1%"
                    },
                    {
                        "drivers": "Trade",
                        "july2020actcontributiondollar": " $2,685 ",
                        "july2020actcontributionpct": "0.1%"
                    },
                    {
                        "drivers": "Ad St Media",
                        "july2020actcontributiondollar": " $0 ",
                        "july2020actcontributionpct": "0.0%"
                    },
                    {
                        "drivers": "TDP",
                        "july2020actcontributiondollar": " $(1,171,045)",
                        "july2020actcontributionpct": "-42.2%"
                    },
                    {
                        "drivers": "Competitor",
                        "july2020actcontributiondollar": " $(140,653)",
                        "july2020actcontributionpct": "-5.1%"
                    },
                    {
                        "drivers": "Innovation",
                        "july2020actcontributiondollar": " $ -    ",
                        "july2020actcontributionpct": "0.0%"
                    },
                    {
                        "drivers": "Covid Impact",
                        "july2020actcontributiondollar": " $868,218 ",
                        "july2020actcontributionpct": "31.3%"
                    },
                    {
                        "drivers": "Pre March Covid Miss",
                        "july2020actcontributiondollar": " $399,404 ",
                        "july2020actcontributionpct": "14.4%"
                    },
                    {
                        "drivers": "CY",
                        "july2020actcontributiondollar": " $2,620,039 ",
                        "july2020actcontributionpct": "-5.6%"
                    },
                    {
                        "drivers": "Change",
                        "july2020actcontributiondollar": " $(154,722)",
                        "july2020actcontributionpct": "-5.6%"
                    }
               ];
               this.actuals = actuals;
               var forecast = [
                   {
                        "drivers": "YAGO",
                        "july2020fccontributiondollar": " $2,774,761 ",
                        "july2020fccontributionpct": "-"
                    },
                    {
                        "drivers": "Base Trend",
                        "july2020fccontributiondollar": " $ -    ",
                        "july2020fccontributionpct": "0.0%"
                    },
                    {
                        "drivers": "RegPrc",
                        "july2020fccontributiondollar": " $89,687 ",
                        "july2020fccontributionpct": "3.2%"
                    },
                    {
                        "drivers": "Trade",
                        "july2020fccontributiondollar": " $(12,030)",
                        "july2020fccontributionpct": "-0.4%"
                    },
                    {
                        "drivers": "Ad St Media",
                        "july2020fccontributiondollar": " $0 ",
                        "july2020fccontributionpct": "0.0%"
                    },
                    {
                        "drivers": "TDP",
                        "july2020fccontributiondollar": " $(1,210,173)",
                        "july2020fccontributionpct": "-43.6%"
                    },
                    {
                        "drivers": "Competitor",
                        "july2020fccontributiondollar": " $(41,546)",
                        "july2020fccontributionpct": "-1.5%"
                    },
                    {
                        "drivers": "Innovation",
                        "july2020fccontributiondollar": " $ -    ",
                        "july2020fccontributionpct": "0.0%"
                    },
                    {
                        "drivers": "Covid Impact",
                        "july2020fccontributiondollar": " $868,218 ",
                        "july2020fccontributionpct": "31.3%"
                    },
                    {
                        "drivers": "Pre March Covid Miss",
                        "july2020fccontributiondollar": " $ -    ",
                        "july2020fccontributionpct": "0.0%"
                    },
                    {
                        "drivers": "CY",
                        "july2020fccontributiondollar": " $2,468,918 ",
                        "july2020fccontributionpct": "-11.0%"
                    },
                    {
                        "drivers": "Change",
                        "july2020fccontributiondollar": " $(305,843)",
                        "july2020fccontributionpct": "-11.0%"
                    }
                ];
                this.forecast = forecast;
           }
           else if(currentCategory.ppg == "Core Snacking"){
               var actuals = [
                   {
                        "drivers": "YAGO",
                        "july2020actcontributiondollar": " $2,774,761 ",
                        "july2020actcontributionpct": "-"
                    },
                    {
                        "drivers": "Base Trend",
                        "july2020actcontributiondollar": " $ -    ",
                        "july2020actcontributionpct": "0.0%"
                    },
                    {
                        "drivers": "RegPrc",
                        "july2020actcontributiondollar": " $(113,332)",
                        "july2020actcontributionpct": "-4.1%"
                    },
                    {
                        "drivers": "Trade",
                        "july2020actcontributiondollar": " $2,685 ",
                        "july2020actcontributionpct": "0.1%"
                    },
                    {
                        "drivers": "Ad St Media",
                        "july2020actcontributiondollar": " $0 ",
                        "july2020actcontributionpct": "0.0%"
                    },
                    {
                        "drivers": "TDP",
                        "july2020actcontributiondollar": " $(1,171,045)",
                        "july2020actcontributionpct": "-42.2%"
                    },
                    {
                        "drivers": "Competitor",
                        "july2020actcontributiondollar": " $(140,653)",
                        "july2020actcontributionpct": "-5.1%"
                    },
                    {
                        "drivers": "Innovation",
                        "july2020actcontributiondollar": " $ -    ",
                        "july2020actcontributionpct": "0.0%"
                    },
                    {
                        "drivers": "Covid Impact",
                        "july2020actcontributiondollar": " $868,218 ",
                        "july2020actcontributionpct": "31.3%"
                    },
                    {
                        "drivers": "Pre March Covid Miss",
                        "july2020actcontributiondollar": " $399,404 ",
                        "july2020actcontributionpct": "14.4%"
                    },
                    {
                        "drivers": "CY",
                        "july2020actcontributiondollar": " $2,620,039 ",
                        "july2020actcontributionpct": "-5.6%"
                    },
                    {
                        "drivers": "Change",
                        "july2020actcontributiondollar": " $(154,722)",
                        "july2020actcontributionpct": "-5.6%"
                    }
               ];
               this.actuals = actuals;
               var forecast = [
                    {
                        "drivers": "YAGO",
                        "july2020fccontributiondollar": " $2,774,761 ",
                        "july2020fccontributionpct": "-"
                    },
                    {
                        "drivers": "Base Trend",
                        "july2020fccontributiondollar": " $ -    ",
                        "july2020fccontributionpct": "0.0%"
                    },
                    {
                        "drivers": "RegPrc",
                        "july2020fccontributiondollar": " $89,687 ",
                        "july2020fccontributionpct": "3.2%"
                    },
                    {
                        "drivers": "Trade",
                        "july2020fccontributiondollar": " $(12,030)",
                        "july2020fccontributionpct": "-0.4%"
                    },
                    {
                        "drivers": "Ad St Media",
                        "july2020fccontributiondollar": " $0 ",
                        "july2020fccontributionpct": "0.0%"
                    },
                    {
                        "drivers": "TDP",
                        "july2020fccontributiondollar": " $(1,210,173)",
                        "july2020fccontributionpct": "-43.6%"
                    },
                    {
                        "drivers": "Competitor",
                        "july2020fccontributiondollar": " $(41,546)",
                        "july2020fccontributionpct": "-1.5%"
                    },
                    {
                        "drivers": "Innovation",
                        "july2020fccontributiondollar": " $ -    ",
                        "july2020fccontributionpct": "0.0%"
                    },
                    {
                        "drivers": "Covid Impact",
                        "july2020fccontributiondollar": " $868,218 ",
                        "july2020fccontributionpct": "31.3%"
                    },
                    {
                        "drivers": "Pre March Covid Miss",
                        "july2020fccontributiondollar": " $ -    ",
                        "july2020fccontributionpct": "0.0%"
                    },
                    {
                        "drivers": "CY",
                        "july2020fccontributiondollar": " $2,468,918 ",
                        "july2020fccontributionpct": "-11.0%"
                    },
                    {
                        "drivers": "Change",
                        "july2020fccontributiondollar": " $(305,843)",
                        "july2020fccontributionpct": "-11.0%"
                    }
                ];
                this.forecast = forecast;
           }           
        }
        
    });
      
      
    
  }

  ngOnInit(): void {
      
  }
  // events
  public chartClicked(e:any):void {  }
 
  public chartHovered(e:any):void { }
}
