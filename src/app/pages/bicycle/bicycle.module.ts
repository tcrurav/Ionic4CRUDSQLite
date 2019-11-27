import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BicyclePageRoutingModule } from './bicycle-routing.module';

import { BicyclePage } from './bicycle.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BicyclePageRoutingModule
  ],
  declarations: [BicyclePage]
})
export class BicyclePageModule {}
