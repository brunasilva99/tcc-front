import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReasonPage } from './reason.page';

const routes: Routes = [
  {
    path: '',
    component: ReasonPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReasonPageRoutingModule {}
