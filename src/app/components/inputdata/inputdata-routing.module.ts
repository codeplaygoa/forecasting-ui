import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AssumptionDataComponent } from './assumption-data/assumption-data.component';
import { ActualsWeeklyDataComponent } from './actuals-weekly-data/actuals-weekly-data.component';
import { ForecastWeeklyDataComponent } from './forecast-weekly-data/forecast-weekly-data.component';

const routes: Routes = [
    {
    path: '',
    children: [
      {
        path: 'assumption-data',
        component: AssumptionDataComponent,
        data: {
          title: "Assumption Data",
          breadcrumb: "Assumption Data"
        }
      },
      {
        path: 'actuals-weekly-data',
        component: ActualsWeeklyDataComponent,
        data: {
          title: "Actuals Weekly Data",
          breadcrumb: "Actuals Weekly Data"
        }
      },
      {
        path: 'forecast-weekly-data',
        component: ForecastWeeklyDataComponent,
        data: {
          title: "Forecast Weekly Data",
          breadcrumb: "Forecast Weekly Data"
        }
      }    
      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InputdataRoutingModule { }
