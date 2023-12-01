import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateAddictionPage } from './create-addiction.page';

const routes: Routes = [
  {
    path: '',
    component: CreateAddictionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateAddictionPageRoutingModule {}
