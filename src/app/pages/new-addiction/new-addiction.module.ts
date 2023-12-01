import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewAddictionPageRoutingModule } from './new-addiction-routing.module';

import { NewAddictionPage } from './new-addiction.page';

import { SharedModule } from 'src/app/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewAddictionPageRoutingModule,
    SharedModule
  ],
  declarations: [NewAddictionPage]
})
export class NewAddictionPageModule {}
