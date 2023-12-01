import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateAddictionPageRoutingModule } from './create-addiction-routing.module';

import { CreateAddictionPage } from './create-addiction.page';

import { SharedModule } from 'src/app/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateAddictionPageRoutingModule,
    SharedModule
  ],
  declarations: [CreateAddictionPage]
})
export class CreateAddictionPageModule {}
