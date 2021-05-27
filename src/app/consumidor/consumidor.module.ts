import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConsumidorPageRoutingModule } from './consumidor-routing.module';

import { ConsumidorPage } from './consumidor.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ConsumidorPageRoutingModule
  ],
  declarations: [ConsumidorPage]
})
export class ConsumidorPageModule {}
