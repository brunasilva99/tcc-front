import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewAddictionPageRoutingModule } from './view-addiction-routing.module';

import { ViewAddictionPage } from './view-addiction.page';

import { SharedModule } from 'src/app/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewAddictionPageRoutingModule,
    SharedModule
  ],
  declarations: [ViewAddictionPage]
})
export class ViewAddictionPageModule {}
