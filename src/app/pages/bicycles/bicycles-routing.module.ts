import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BicyclesPage } from './bicycles.page';

const routes: Routes = [
  {
    path: '',
    component: BicyclesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BicyclesPageRoutingModule {}
