import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ConfigsPage } from './configs.page';

import { ConfigsPageRoutingModule } from './configs-routing.module';

import { SharedModule } from 'src/app/shared.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ConfigsPageRoutingModule,
    SharedModule
  ],
  declarations: [ConfigsPage]
})
export class ConfigsPageModule {}
