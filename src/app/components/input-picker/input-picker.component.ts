import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-input-picker',
  templateUrl: './input-picker.component.html',
  styleUrls: ['./input-picker.component.scss'],
})
export class InputPickerComponent  implements OnInit {

  @Input() value: string = '';
  @Input() placeholder: string = '';
  @Input() label: string = '';

  constructor() { }

  ngOnInit() {}

}
