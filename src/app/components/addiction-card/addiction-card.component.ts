import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-addiction-card',
  templateUrl: './addiction-card.component.html',
  styleUrls: ['./addiction-card.component.scss'],
})
export class AddictionCardComponent  implements OnInit {

  @Input() name!: string;
  @Input() image!: string;

  constructor() { }

  ngOnInit() {}

}
