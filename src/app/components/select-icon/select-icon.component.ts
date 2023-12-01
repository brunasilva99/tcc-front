import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-select-icon',
  templateUrl: './select-icon.component.html',
  styleUrls: ['./select-icon.component.scss'],
})
export class SelectIconComponent {

  @Output() onSelectedIcon: EventEmitter<string> = new EventEmitter();

  public cancel(modal: any) {
    modal.dismiss(null, 'cancel');
  }

}
