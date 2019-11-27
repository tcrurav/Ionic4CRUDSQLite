import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BicyclesPageRoutingModule } from './bicycles-routing.module';

import { BicyclesPage } from './bicycles.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BicyclesPageRoutingModule
  ],
  declarations: [BicyclesPage]
})
export class BicyclesPageModule {}
