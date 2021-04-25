import { Component, OnInit } from '@angular/core';
import { NgbTabChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
import { CategoryService, CategoryPPG } from '../../../shared/services/category.service';
import { corePPG } from '../../../shared/data/ppg/coreppg/input-coreppg';
import { corePPGUpload } from '../../../shared/data/ppg/coreppg/input-coreppgupload';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-weekly-data',
  templateUrl: './weekly-data.component.html', 
  styleUrls: ['./weekly-data.component.scss']
})
export class WeeklyDataComponent implements OnInit {

  currentJustify = 'start';
  currentOrientation = 'horizontal';
  public progress:number = 0;
  public ppg = [];
  public currentppg;
subscription: Subscription;    
    
  constructor(private categoryService: CategoryService,private router: Router) { 
  
    this.subscription = this.categoryService.getCategory().subscribe(currentCategory => {
        this.currentppg = currentCategory.ppg
        
    });
      this.ppg = corePPG.data;
  }

  ngOnInit() {  }

  public beforeChange($event: NgbTabChangeEvent) {
    
  }
    
  public dropzoneconfig: DropzoneConfigInterface = {
    clickable: true,
    maxFiles: 1,
    autoReset: null,
    errorReset: null,
    cancelReset: null,
    acceptedFiles: '.csv'
  }; 


  public onUploadInit(args: any): void {}

  public onUploadError(args: any): void {}

  public onUploadSuccess(args: any): void {this.ppg = corePPGUpload.data;}    

  public computeData():void {
   let timerId = setInterval(() => {
      
      this.progress += 10
  }, 1000);

    // after 10 seconds stop
    setTimeout(() => { clearInterval(timerId); this.router.navigate(['/analysis/forecasting']); }, 10000);
      
  }
}
