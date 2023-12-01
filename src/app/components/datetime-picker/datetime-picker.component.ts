import { Component, Output, EventEmitter } from '@angular/core';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-datetime-picker',
  templateUrl: './datetime-picker.component.html',
  styleUrls: ['./datetime-picker.component.scss'],
})
export class DatetimePickerComponent {

  dateNow = new Date();

  dateTime: any;

  @Output() onConfirm: EventEmitter<any> = new EventEmitter;
  @Output() onCancel: EventEmitter<any> = new EventEmitter;

  constructor(
    private appComponent: AppComponent
  ) { }

  async confirm(datetime: any): Promise<void> {

    await datetime.confirm();

    if (this.dateTime === undefined) return this.appComponent.toastDanger('Escolha uma data!');

    this.onConfirm.emit(this.dateTime);

  }

  async cancel(): Promise<void> {

    this.onCancel.emit();

  }

}
