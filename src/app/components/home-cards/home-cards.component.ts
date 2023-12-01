import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-home-cards',
  templateUrl: './home-cards.component.html',
  styleUrls: ['./home-cards.component.scss'],
})
export class HomeCardsComponent {

  @Input() name!: string;
  @Input() image!: string;
  @Input() abstinenceDate!: string;

  getAbstinenceTime(date: string): string {

    const dateNow = new Date();

    const day: number = Number(date.slice(8, 10));
    const month: number = Number(date.slice(5, 7)) - 1;
    const year: number = Number(date.slice(0, 4));

    const inputDate = new Date(year, month, day);
    const timeDifference = dateNow.getTime() - inputDate.getTime();
    const daysSinceAbstinence = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

    return daysSinceAbstinence < 1 ? 'Menos de 1 dia' : daysSinceAbstinence + ' dias';

  }

}
