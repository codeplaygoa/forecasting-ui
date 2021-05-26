import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AssumptionsComponent } from './assumptions/assumptions.component';
import { ForecastingComponent } from './forecasting/forecasting.component';
import { RetailerwiseComponent } from './forecasting/retailerwise/retailerwise.component';
import { ActualizationComponent } from './actualization/actualization.component';
import { SimulationsComponent } from './simulations/simulations.component';

const routes: Routes = [
    {
    path: '',
    children: [
      {
        path: 'forecasting',
        component: ForecastingComponent,
        data: {
          title: "Forecasting",
          breadcrumb: "Forecasting"
        }
      },
      {
        path: 'forecasting/retailerwise/retailer/:retailerid',
        component: RetailerwiseComponent,
        data: {
          title: "Forecasting Retailerwise",
          breadcrumb: "Forecasting Retailerwise"
        }
      },
      {
        path: 'assumptions',
        component: AssumptionsComponent,
        data: {
          title: "Input & Assumptions",
          breadcrumb: "Input & Assumptions"
        }
      },
      {
        path: 'actualization',
        component: ActualizationComponent,
        data: {
          title: "Actualization",
          breadcrumb: "Actualization"
        }
      }, 
      {
        path: 'simulations',
        component: SimulationsComponent,
        data: {
          title: "Simulations",
          breadcrumb: "Simulations"
        }
      },
      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AnalysisRoutingModule { }