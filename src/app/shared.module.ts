import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { FormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";

// Components
import { AddictionCardComponent } from "./components/addiction-card/addiction-card.component"; 
import { ConfigCardComponent } from "./components/config-card/config-card.component";
import { HomeCardsComponent } from "./components/home-cards/home-cards.component";
import { NavigateButtonsComponent } from "./components/navigate-buttons/navigate-buttons.component";
import { DatetimePickerComponent } from "./components/datetime-picker/datetime-picker.component";
import { GoalsComponent } from "./components/goals/goals.component";
import { InputPickerComponent } from "./components/input-picker/input-picker.component";
import { ReasonCardComponent } from "./components/reason-card/reason-card.component";
import { SelectIconComponent } from "./components/select-icon/select-icon.component";

@NgModule({
  declarations: [
    AddictionCardComponent,
    ConfigCardComponent,
    HomeCardsComponent,
    NavigateButtonsComponent,
    DatetimePickerComponent,
    GoalsComponent,
    InputPickerComponent,
    ReasonCardComponent,
    SelectIconComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule
  ],
  exports: [
    AddictionCardComponent,
    ConfigCardComponent,
    HomeCardsComponent,
    NavigateButtonsComponent,
    DatetimePickerComponent,
    GoalsComponent,
    InputPickerComponent,
    ReasonCardComponent,
    SelectIconComponent
  ],
  providers: [

  ]
})

export class SharedModule {}