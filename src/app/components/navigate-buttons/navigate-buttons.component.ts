import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-navigate-buttons',
  templateUrl: './navigate-buttons.component.html',
  styleUrls: ['./navigate-buttons.component.scss'],
})
export class NavigateButtonsComponent {

  @Input() action!: 'back' | 'next';
  @Output() onSelected: EventEmitter<any> = new EventEmitter; 

}