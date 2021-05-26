import { Component, ViewEncapsulation , Renderer2, ViewChild, ElementRef, OnInit } from '@angular/core';
import { DropzoneComponent, DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { CategoryService, CategoryPPG } from '../../../shared/services/category.service';
import { RestApiService } from "../../../shared/services/rest-api.service";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-weekly-data',
  templateUrl: './forecast-weekly-data.component.html', 
  styleUrls: ['./forecast-weekly-data.component.scss'], 
    encapsulation: ViewEncapsulation.None
})
export class ForecastWeeklyDataComponent implements OnInit {

  currentJustify = 'start';
  currentOrientation = 'horizontal';
  public progress:number = 0;
  subscription: Subscription;   
  currentuser = 0;  
  public years;
  public months;
  public selectedYear: string;
  public selectedMonth: string;
  public actualStatus: string;

  @ViewChild(DropzoneComponent, { static: false }) componentRef?: DropzoneComponent;
  @ViewChild('status') status: ElementRef;
  
  constructor(private restApi: RestApiService, private renderer: Renderer2, private router: Router,  private categoryService: CategoryService) {
       this.restApi.getYears().subscribe((data: {}) => {  
        this.years = data
       })
      this.months = ['January','February','March','April','May','June','July','August','September','October','November','December']
      this.categoryService.getCategory().subscribe((data:{}) =>{
          if(data.hasOwnProperty("category")){
              this.restApi.getLastActualsYearMonth(this.categoryService.getCategoryObject().category).subscribe((data: {}) => {  
                this.actualStatus = "Note: Last Actuals imported were for " + this.months[data[0][0] - 1] + " " + data[0][1]
                if(data[0][0] == 12){
                  this.changeYear(data[0][1]+1)  
                  this.changeMonth(this.months[0])
                }
                  else{
                      this.changeYear(data[0][1])  
                      this.changeMonth(this.months[data[0][0]])
                  }
            })
          }
      })
      
  }

  ngOnInit() {
    this.selectedYear = 'Select Year'  
    this.selectedMonth = 'Select Month'  
  }
  public changeYear(selectedYear){
      this.selectedYear = selectedYear  
  }
  public changeMonth(selectedMonth){
      this.selectedMonth = selectedMonth  
  }

  public dropzoneconfig: DropzoneConfigInterface = {
        clickable: true,
        maxFiles: 1,
        url: '/api-v1/upload/',
        maxFilesize: 50,
        paramName: 'file',
        timeout: 1800000,  
        autoReset: null,
        errorReset: null,
        cancelReset: null,
        acceptedFiles: '.csv',
        headers: {'Content-Disposition': 'attachment; filename=rawdata.csv'},
        params: { 'uid': JSON.parse(localStorage.getItem('user')).uid }
  };   
  
  ShowAlert(type,msg) {
    Swal.fire({
      showConfirmButton: false,
      timerProgressBar: true,
      timer: 4000,
      position: 'top-right',
      toast: true,
      title: msg,
      icon: type,
    })
  }

  

  public onUploadInit(args: any): void {
     
  } 

  public onUploadError(args: any): void {
      
      
  }
  public onAddedFile(args: any): void {
      
       if(this.selectedYear == 'Select Year' || this.selectedMonth == 'Select Month' ){
          this.ShowAlert('error','Please select Month & Year');
          this.componentRef.directiveRef.reset()
      }
  }

  public onSending(args: any): void {    
     
          args[2].append("month", this.months.indexOf(this.selectedMonth)+1);
          args[2].append("year", this.selectedYear);
          args[2].append("category", this.categoryService.getCategoryObject().category);
          args[2].append("datatype", "Forecast");
          const li: HTMLUListElement = this.renderer.createElement('li');
          li.innerHTML = "Uploading File on Server <img class='float-right pulsating' src='assets/images/pulse.gif'/>"
          this.renderer.appendChild(this.status.nativeElement, li)  
      
      
  }

  public onUploadSuccess(event): void {
      const list = this.status.nativeElement.querySelectorAll('li');    
      this.renderer.removeChild(this.status.nativeElement, list[list.length - 1]);
      const li: HTMLUListElement = this.renderer.createElement('li');
      li.innerHTML = "Uploading File on Server Completed <img class='float-right pulsating' src='assets/images/double-tick.png'/>"
      this.renderer.appendChild(this.status.nativeElement, li)  
    
      const mapli: HTMLUListElement = this.renderer.createElement('li');
      mapli.innerHTML = "Mapping Imported Data <img class='float-right pulsating' src='assets/images/pulse.gif'/>"
      this.renderer.appendChild(this.status.nativeElement, mapli)
     
      console.log("map data forecast") 
      this.restApi.mapImportedData(this.categoryService.getCategoryObject().category,'Forecast',JSON.parse(localStorage.getItem('user')).uid).subscribe((data:any) => {    
          
          const list1 = this.status.nativeElement.querySelectorAll('li');    
          this.renderer.removeChild(this.status.nativeElement, list1[list1.length - 1]);
          const li1: HTMLUListElement = this.renderer.createElement('li');
          let status = ''
          
            if( data.counts[0].totalrecords != data.counts[0].updatedrecords )
                status = "<span class='font-warning'>Note: " + data.counts[0].updatedrecords + " records mapped correctly out of " + data.counts[0].totalrecords + " records.</span>"
          li1.innerHTML = "Mapping Imported Data Completed. " + status + "<img class='float-right pulsating' src='assets/images/double-tick.png'/>"
          this.renderer.appendChild(this.status.nativeElement, li1)           
     
          const sumli: HTMLUListElement = this.renderer.createElement('li');
          sumli.innerHTML = "Building Summary Tables <img class='float-right pulsating' src='assets/images/pulse.gif'/>"
          this.renderer.appendChild(this.status.nativeElement, sumli)           
         
         console.log("build data forecast")
         this.restApi.buildSummaryData(this.categoryService.getCategoryObject().category,this.selectedYear,this.months.indexOf(this.selectedMonth)+1,'Forecast',JSON.parse(localStorage.getItem('user')).uid).subscribe((data: {}) => {  
                const list3 = this.status.nativeElement.querySelectorAll('li');    
                this.renderer.removeChild(this.status.nativeElement, list3[list3.length - 1]);
                const li3: HTMLUListElement = this.renderer.createElement('li');
                li3.innerHTML = "Building Summary Tables Completed <img class='float-right pulsating' src='assets/images/double-tick.png'/>"
                this.renderer.appendChild(this.status.nativeElement, li3)
                this.router.navigate(['/analysis/forecasting']);
          });
      });     
  }     

  public resetDropzoneUploads(): void {
    this.componentRef.directiveRef.reset();
    const childElements = this.status.nativeElement.children;
    for (let child of childElements) {
      this.renderer.removeChild(this.status.nativeElement, child);
    }
   
  }
  
}
