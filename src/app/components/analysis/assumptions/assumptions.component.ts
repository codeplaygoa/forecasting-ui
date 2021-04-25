import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CategoryService, CategoryPPG } from '../../../shared/services/category.service';

@Component({
  selector: 'app-assumptions',
  templateUrl: './assumptions.component.html',
  styleUrls: ['./assumptions.component.scss']
})
export class AssumptionsComponent implements OnInit {

   // lineGraph Chart
  public lineChartOptions;
  public lineChartLabels;
  public lineChartType;
  public lineChartLegend;
  public lineChartData;
  public lineChartColors;    

  public currentppg;
  subscription: Subscription;    
    
  constructor(private categoryService: CategoryService) { 
  
    this.subscription = this.categoryService.getCategory().subscribe(currentCategory => {
        this.currentppg = currentCategory.ppg       
        
        if(currentCategory){
           if(currentCategory.ppg == "Core 300"){
                var lineChartData: Array<any> = [
                  { data: [-1,4.5,4,3,-2,-5,0,0,0,0,0,0,0,0,0,0,0,0], label: 'AvgPrc' },
                  { data: [-3.9,-3.9,-3.9,-1.1,-1.1,-1.1,0,0,0,0,0,0,0,0,0,0,0,0], label: 'TDP' },
                  { data: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], label: 'Seasonal Base' },
                  { data: [10,0,0,0,0,0,1,2,1,0,0,0,1,2,0,0,2,1], label: 'Media Spend' },
                  { data: [0,0,-3,0,0,0,0,0,0,0,0,0,0,0,-2,0,0,0], label: 'Dare AvgPrc' },
                  { data: [0,0,-2,0,0,0,0,0,0,0,0,0,0,0,-1,0,0,0], label: 'Leclerc AvgPrc' }
                ];
                var lineChartLabels: Array<any> = ["2020 Jul", "2020 Aug", "2020 Sep", "2020 Oct", "2020 Nov", "2020 Dec","2021 Jan", "2021 Feb", "2021 Mar", "2021 Apr", "2021 May", "2021 Jun", "2021 Jul", "2021 Aug", "2021 Sep", "2021 Oct", "2021 Nov", "2021 Dec"];
                var lineChartOptions: any = {
                  responsive: true,
                  scaleShowVerticalLines: false,
                  maintainAspectRatio: false,

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
                  },
                  {
                    backgroundColor: 'rgba(168, 202, 42, 0.3)',
                    borderColor: "#4466f2",
                    borderWidth: 2,
                    lineTension: 0,
                  },
                  {
                    backgroundColor: 'rgba(230, 66, 236, 0.3)',
                    borderColor: "#1ea6ec",
                    borderWidth: 2,
                    lineTension: 0,
                  },
                  {
                    backgroundColor: 'rgba(8, 202, 242, 0.4)',
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
           }
           else if(currentCategory.ppg == "FamilySize"){
                var lineChartData: Array<any> = [
                  { data: [-5,-5,-4,-13,-1,3,0,0,0,0,0,0,0,0,0,0,0,0], label: 'AvgPrc' },
                  { data: [48,48,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], label: 'TDP' },
                  { data: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], label: 'Seasonal Base' },
                  { data: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], label: 'Media Spend' },
                  { data: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], label: 'Dare AvgPrc' },
                  { data: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], label: 'Leclerc AvgPrc' }
                ];
                var lineChartLabels: Array<any> = ["2020 Jul", "2020 Aug", "2020 Sep", "2020 Oct", "2020 Nov", "2020 Dec","2021 Jan", "2021 Feb", "2021 Mar", "2021 Apr", "2021 May", "2021 Jun", "2021 Jul", "2021 Aug", "2021 Sep", "2021 Oct", "2021 Nov", "2021 Dec"];
                var lineChartOptions: any = {
                  responsive: true,
                  scaleShowVerticalLines: false,
                  maintainAspectRatio: false,

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
                  },
                  {
                    backgroundColor: 'rgba(168, 202, 42, 0.3)',
                    borderColor: "#4466f2",
                    borderWidth: 2,
                    lineTension: 0,
                  },
                  {
                    backgroundColor: 'rgba(230, 66, 236, 0.3)',
                    borderColor: "#1ea6ec",
                    borderWidth: 2,
                    lineTension: 0,
                  },
                  {
                    backgroundColor: 'rgba(8, 202, 242, 0.4)',
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
           }
           else if(currentCategory.ppg == "PeekFreans"){
                var lineChartData: Array<any> = [
                  { data: [-2,-1,1,4,16,4,0,0,0,0,0,0,0,0,0,0,0,0], label: 'AvgPrc' },
                  { data: [15,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], label: 'TDP' },
                  { data: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], label: 'Seasonal Base' },
                  { data: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], label: 'Media Spend' },
                  { data: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], label: 'Dare AvgPrc' },
                  { data: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], label: 'Leclerc AvgPrc' }
                ];
                var lineChartLabels: Array<any> = ["2020 Jul", "2020 Aug", "2020 Sep", "2020 Oct", "2020 Nov", "2020 Dec","2021 Jan", "2021 Feb", "2021 Mar", "2021 Apr", "2021 May", "2021 Jun", "2021 Jul", "2021 Aug", "2021 Sep", "2021 Oct", "2021 Nov", "2021 Dec"];
                var lineChartOptions: any = {
                  responsive: true,
                  scaleShowVerticalLines: false,
                  maintainAspectRatio: false,

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
                  },
                  {
                    backgroundColor: 'rgba(168, 202, 42, 0.3)',
                    borderColor: "#4466f2",
                    borderWidth: 2,
                    lineTension: 0,
                  },
                  {
                    backgroundColor: 'rgba(230, 66, 236, 0.3)',
                    borderColor: "#1ea6ec",
                    borderWidth: 2,
                    lineTension: 0,
                  },
                  {
                    backgroundColor: 'rgba(8, 202, 242, 0.4)',
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
           }
           else if(currentCategory.ppg == "Dads"){
                var lineChartData: Array<any> = [
                  { data: [-4,-5,0,-8,11,2,0,0,0,0,0,0,0,0,0,0,0,0], label: 'AvgPrc' },
                  { data: [10,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], label: 'TDP' },
                  { data: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], label: 'Seasonal Base' },
                  { data: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], label: 'Media Spend' },
                  { data: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], label: 'Dare AvgPrc' },
                  { data: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], label: 'Leclerc AvgPrc' }
                ];
                var lineChartLabels: Array<any> = ["2020 Jul", "2020 Aug", "2020 Sep", "2020 Oct", "2020 Nov", "2020 Dec","2021 Jan", "2021 Feb", "2021 Mar", "2021 Apr", "2021 May", "2021 Jun", "2021 Jul", "2021 Aug", "2021 Sep", "2021 Oct", "2021 Nov", "2021 Dec"];
                var lineChartOptions: any = {
                  responsive: true,
                  scaleShowVerticalLines: false,
                  maintainAspectRatio: false,

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
                  },
                  {
                    backgroundColor: 'rgba(168, 202, 42, 0.3)',
                    borderColor: "#4466f2",
                    borderWidth: 2,
                    lineTension: 0,
                  },
                  {
                    backgroundColor: 'rgba(230, 66, 236, 0.3)',
                    borderColor: "#1ea6ec",
                    borderWidth: 2,
                    lineTension: 0,
                  },
                  {
                    backgroundColor: 'rgba(8, 202, 242, 0.4)',
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
           }
           else if(currentCategory.ppg == "Kids"){
                var lineChartData: Array<any> = [
                  { data: [2,5,2,0,-2,3,0,0,0,0,0,0,0,0,0,0,0,0], label: 'AvgPrc' },
                  { data: [17,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], label: 'TDP' },
                  { data: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], label: 'Seasonal Base' },
                  { data: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], label: 'Media Spend' },
                  { data: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], label: 'Dare AvgPrc' },
                  { data: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], label: 'Leclerc AvgPrc' }
                ];
                var lineChartLabels: Array<any> = ["2020 Jul", "2020 Aug", "2020 Sep", "2020 Oct", "2020 Nov", "2020 Dec","2021 Jan", "2021 Feb", "2021 Mar", "2021 Apr", "2021 May", "2021 Jun", "2021 Jul", "2021 Aug", "2021 Sep", "2021 Oct", "2021 Nov", "2021 Dec"];
                var lineChartOptions: any = {
                  responsive: true,
                  scaleShowVerticalLines: false,
                  maintainAspectRatio: false,

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
                  },
                  {
                    backgroundColor: 'rgba(168, 202, 42, 0.3)',
                    borderColor: "#4466f2",
                    borderWidth: 2,
                    lineTension: 0,
                  },
                  {
                    backgroundColor: 'rgba(230, 66, 236, 0.3)',
                    borderColor: "#1ea6ec",
                    borderWidth: 2,
                    lineTension: 0,
                  },
                  {
                    backgroundColor: 'rgba(8, 202, 242, 0.4)',
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
           }
           else if(currentCategory.ppg == "Core Snacking"){
                var lineChartData: Array<any> = [
                  { data: [-1,4.5,4,3,-2,-5,0,0,0,0,0,0,0,0,0,0,0,0], label: 'AvgPrc' },
                  { data: [-3.9,-3.9,-3.9,-1.1,-1.1,-1.1,0,0,0,0,0,0,0,0,0,0,0,0], label: 'TDP' },
                  { data: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], label: 'Seasonal Base' },
                  { data: [10,0,0,0,0,0,1,2,1,0,0,0,1,2,0,0,2,1], label: 'Media Spend' },
                  { data: [0,0,-3,0,0,0,0,0,0,0,0,0,0,0,-2,0,0,0], label: 'Dare AvgPrc' },
                  { data: [0,0,-2,0,0,0,0,0,0,0,0,0,0,0,-1,0,0,0], label: 'Leclerc AvgPrc' }
                ];
                var lineChartLabels: Array<any> = ["2020 Jul", "2020 Aug", "2020 Sep", "2020 Oct", "2020 Nov", "2020 Dec","2021 Jan", "2021 Feb", "2021 Mar", "2021 Apr", "2021 May", "2021 Jun", "2021 Jul", "2021 Aug", "2021 Sep", "2021 Oct", "2021 Nov", "2021 Dec"];
                var lineChartOptions: any = {
                  responsive: true,
                  scaleShowVerticalLines: false,
                  maintainAspectRatio: false,

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
                  },
                  {
                    backgroundColor: 'rgba(168, 202, 42, 0.3)',
                    borderColor: "#4466f2",
                    borderWidth: 2,
                    lineTension: 0,
                  },
                  {
                    backgroundColor: 'rgba(230, 66, 236, 0.3)',
                    borderColor: "#1ea6ec",
                    borderWidth: 2,
                    lineTension: 0,
                  },
                  {
                    backgroundColor: 'rgba(8, 202, 242, 0.4)',
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
