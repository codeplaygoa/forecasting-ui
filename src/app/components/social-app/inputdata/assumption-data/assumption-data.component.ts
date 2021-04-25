import { Component, OnInit } from '@angular/core';
import {NgbTabChangeEvent} from '@ng-bootstrap/ng-bootstrap';
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
import { CategoryService, CategoryPPG } from '../../../shared/services/category.service';
import { corePPG } from '../../../shared/data/ppg/coreppg/assumption-coreppg';
import { corePPGUpload } from '../../../shared/data/ppg/coreppg/assumption-coreppgupload';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-assumption-data',
  templateUrl: './assumption-data.component.html',
  styleUrls: ['./assumption-data.component.scss']
})
export class AssumptionDataComponent implements OnInit {

  currentJustify = 'start';
  currentOrientation = 'horizontal';

  public assumption = []
  public currentppg;
  subscription: Subscription;    
    
  constructor(private categoryService: CategoryService) { 
  
    this.subscription = this.categoryService.getCategory().subscribe(currentCategory => {
        this.currentppg = currentCategory.ppg        
    });
    this.assumption = corePPG.data;
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


  public onUploadInit(args: any): void { }

  public onUploadError(args: any): void { }

  public onUploadSuccess(args: any): void { this.assumption = corePPGUpload.data; }   

  public computeData():void {
      
      
  }
}
