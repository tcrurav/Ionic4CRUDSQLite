import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BicyclePage } from './bicycle.page';

const routes: Routes = [
  {
    path: '',
    component: BicyclePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BicyclePageRoutingModule {}
