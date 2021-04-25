import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AnalysisRoutingModule } from './analysis-routing.module';
import { ChartsModule } from 'ng2-charts';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { ForecastingComponent } from './forecasting/forecasting.component';
import { AssumptionsComponent } from './assumptions/assumptions.component';
import { SimulationsComponent } from './simulations/simulations.component';
import { ActualizationComponent } from './actualization/actualization.component';
import { RetailerwiseComponent } from './forecasting/retailerwise/retailerwise.component';


@NgModule({
  declarations: [ForecastingComponent, AssumptionsComponent, SimulationsComponent, ActualizationComponent, RetailerwiseComponent],
  imports: [
    CommonModule,
    AnalysisRoutingModule,
    ChartsModule,
    NgbModule,
    NgxDatatableModule
  ]
})
export class AnalysisModule { }
