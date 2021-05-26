import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { DropzoneModule } from 'ngx-dropzone-wrapper';
import { DROPZONE_CONFIG } from 'ngx-dropzone-wrapper';
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
import { InputdataRoutingModule } from './inputdata-routing.module';

import { ActualsWeeklyDataComponent } from './actuals-weekly-data/actuals-weekly-data.component';
import { ForecastWeeklyDataComponent } from './forecast-weekly-data/forecast-weekly-data.component';
import { AssumptionDataComponent } from './assumption-data/assumption-data.component';
const DEFAULT_DROPZONE_CONFIG: DropzoneConfigInterface = {
  maxFilesize: 50,
  url: 'https://httpbin.org/post',
};

@NgModule({
  declarations: [ActualsWeeklyDataComponent, ForecastWeeklyDataComponent, AssumptionDataComponent],
  imports: [
    CommonModule,
    InputdataRoutingModule,
    NgbModule,
    NgxDatatableModule,
    DropzoneModule,
    
  ],
    providers: [
    { provide: DROPZONE_CONFIG, useValue: DEFAULT_DROPZONE_CONFIG }
  ],
})
export class InputdataModule { } 
