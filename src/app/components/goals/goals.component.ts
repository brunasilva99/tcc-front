import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-goals',
  templateUrl: './goals.component.html',
  styleUrls: ['./goals.component.scss'],
})
export class GoalsComponent  implements OnInit {

  @Input() timeAbs!: string;

  constructor() { }

  ngOnInit() {}

  cancel(modal: any) {
    modal.dismiss(null, 'cancel');
  }

  daysAbs(): number {
    const dateNow = new Date();
    const dateAbs = new Date(this.timeAbs);
  
    const timeDifference = dateNow.getTime() - dateAbs.getTime();
    const daysDifference = Math.round(timeDifference / (1000 * 60 * 60 * 24));
  
    return daysDifference;
  }

}
