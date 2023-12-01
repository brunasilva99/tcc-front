import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'create-addiction',
    loadChildren: () => import('./pages/create-addiction/create-addiction.module').then( m => m.CreateAddictionPageModule)
  },  {
    path: 'view-addiction',
    loadChildren: () => import('./pages/view-addiction/view-addiction.module').then( m => m.ViewAddictionPageModule)
  },
  {
    path: 'reason',
    loadChildren: () => import('./pages/reason/reason.module').then( m => m.ReasonPageModule)
  },
  {
    path: 'edit',
    loadChildren: () => import('./pages/edit/edit.module').then( m => m.EditPageModule)
  }

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
