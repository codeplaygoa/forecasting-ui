import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AssumptionDataComponent } from './assumption-data/assumption-data.component';
import { WeeklyDataComponent } from './weekly-data/weekly-data.component';

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
        path: 'weekly-data',
        component: WeeklyDataComponent,
        data: {
          title: "Weekly Data",
          breadcrumb: "Weekly Data"
        }
      },    
      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InputdataRoutingModule { }
