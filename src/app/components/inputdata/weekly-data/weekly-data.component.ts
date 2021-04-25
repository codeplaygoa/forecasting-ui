import { Component, ViewEncapsulation , Renderer2, ViewChild, ElementRef, OnInit } from '@angular/core';
import { DropzoneComponent, DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { CategoryService, CategoryPPG } from '../../../shared/services/category.service';
import { RestApiService } from "../../../shared/services/rest-api.service";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-weekly-data',
  templateUrl: './weekly-data.component.html', 
  styleUrls: ['./weekly-data.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class WeeklyDataComponent implements OnInit {

  currentJustify = 'start';
  currentOrientation = 'horizontal';
  public progress:number = 0;
  subscription: Subscription;   
  currentuser = 0;
  
  public years;
  public months;
    public selectedYear: string;
    public selectedMonth: string;

  @ViewChild(DropzoneComponent, { static: false }) componentRef?: DropzoneComponent;
  @ViewChild('status') status: ElementRef;
  
  constructor(private restApi: RestApiService, private renderer: Renderer2, private router: Router,  private categoryService: CategoryService) {
       this.restApi.getYears().subscribe((data: {}) => {  
        this.years = data
       })
      this.months = ['January','February','March','April','May','June','July','August','September','October','November','December']
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
     
          //console.log(this.months.indexOf(this.selectedMonth)+1)
          args[2].append("month", this.months.indexOf(this.selectedMonth)+1);
          args[2].append("year", this.selectedYear);
          args[2].append("category", this.categoryService.getCategoryObject().category);
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
      
      this.restApi.mapImportedData(this.categoryService.getCategoryObject().category).subscribe((data: {}) => {    
          const list1 = this.status.nativeElement.querySelectorAll('li');    
          this.renderer.removeChild(this.status.nativeElement, list1[list1.length - 1]);
          const li1: HTMLUListElement = this.renderer.createElement('li');
          li1.innerHTML = "Mapping Imported Data Completed <img class='float-right pulsating' src='assets/images/double-tick.png'/>"
          this.renderer.appendChild(this.status.nativeElement, li1) 
          
          const anali: HTMLUListElement = this.renderer.createElement('li');
          anali.innerHTML = "Analysing Imported data with last inserted data <img class='float-right pulsating' src='assets/images/pulse.gif'/>"
          this.renderer.appendChild(this.status.nativeElement, anali)
          this.restApi.analyseImportedData(this.categoryService.getCategoryObject().category,this.selectedYear,this.months.indexOf(this.selectedMonth)+1).subscribe((data: {}) => {    
                const list2 = this.status.nativeElement.querySelectorAll('li');    
                this.renderer.removeChild(this.status.nativeElement, list2[list2.length - 1]);
                const li2: HTMLUListElement = this.renderer.createElement('li');
                li2.innerHTML = "Analysing Imported data Completed <img class='float-right pulsating' src='assets/images/double-tick.png'/>"
                this.renderer.appendChild(this.status.nativeElement, li2)

                /*const anastatusli: HTMLUListElement = this.renderer.createElement('li');
                anastatusli.innerHTML = "  -  " + data[0].count + " records MisMatched."
                this.renderer.appendChild(this.status.nativeElement, anastatusli)  
              */
                if(data[0].count!=0){
                    
                    Swal.fire({
                      showConfirmButton: true,
                      title: data[0].count + ' Mismatches found in previous data',
                      icon: 'error',
                      allowOutsideClick: false,
                        allowEscapeKey: false,
                        allowEnterKey: false,
                        showCancelButton: true,
                        confirmButtonText: 'Proceed',
                        cancelButtonText: 'Stop',
                    }).then((result) => {
                        if(result.value){
                            const sumli: HTMLUListElement = this.renderer.createElement('li');
                            sumli.innerHTML = "Building Summary Tables <img class='float-right pulsating' src='assets/images/pulse.gif'/>"
                            this.renderer.appendChild(this.status.nativeElement, sumli)  
                            this.restApi.buildSummaryData(this.categoryService.getCategoryObject().category).subscribe((data: {}) => { 
                                const list3 = this.status.nativeElement.querySelectorAll('li');    
                                this.renderer.removeChild(this.status.nativeElement, list3[list3.length - 1]);
                                const li3: HTMLUListElement = this.renderer.createElement('li');
                                li3.innerHTML = "Building Summary Tables Completed <img class='float-right pulsating' src='assets/images/double-tick.png'/>"
                                this.renderer.appendChild(this.status.nativeElement, li3)
                                this.router.navigate(['/analysis/forecasting']);
                            });
                        }
                        else{
                            const cancelli: HTMLUListElement = this.renderer.createElement('li');
                            cancelli.innerHTML = "Import process cancelled <img class='float-right aborted' src='assets/images/aborted.png'/>"
                            this.renderer.appendChild(this.status.nativeElement, cancelli)  
                        }
                    })
                    
                }
                else{
                    const sumli: HTMLUListElement = this.renderer.createElement('li');
                    sumli.innerHTML = "Building Summary Tables <img class='float-right pulsating' src='assets/images/pulse.gif'/>"
                    this.renderer.appendChild(this.status.nativeElement, sumli)  
                    this.restApi.buildSummaryData(this.categoryService.getCategoryObject().category).subscribe((data: {}) => { 
                        const list3 = this.status.nativeElement.querySelectorAll('li');    
                        this.renderer.removeChild(this.status.nativeElement, list3[list3.length - 1]);
                        const li3: HTMLUListElement = this.renderer.createElement('li');
                        li3.innerHTML = "Building Summary Tables Completed <img class='float-right pulsating' src='assets/images/double-tick.png'/>"
                        this.renderer.appendChild(this.status.nativeElement, li3)
                        this.router.navigate(['/analysis/forecasting']);
                    });
                    
                }
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
