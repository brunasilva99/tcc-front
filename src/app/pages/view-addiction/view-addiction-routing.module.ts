import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewAddictionPage } from './view-addiction.page';

const routes: Routes = [
  {
    path: '',
    component: ViewAddictionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewAddictionPageRoutingModule {}
