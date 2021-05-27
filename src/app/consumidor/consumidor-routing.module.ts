import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConsumidorPage } from './consumidor.page';

const routes: Routes = [
  {
    path: '',
    component: ConsumidorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConsumidorPageRoutingModule {}
