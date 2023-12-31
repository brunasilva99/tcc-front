import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfigsPage } from './configs.page';

const routes: Routes = [
  {
    path: '',
    component: ConfigsPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfigsPageRoutingModule {}
