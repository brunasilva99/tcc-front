import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { QuotesService } from 'src/app/services/quotes.service';

@Component({
  selector: 'app-config-card',
  templateUrl: './config-card.component.html',
  styleUrls: ['./config-card.component.scss'],
})
export class ConfigCardComponent implements OnInit{

  @Input() isButton: boolean = false;
  @Input() isQuote: boolean = false;
  @Input() showToggleButton: boolean = true;
  @Input() valueToggleButton: boolean = false;
  @Input() text!: string;
  @Input() image!: string;

  @Output() onChangeConfig: EventEmitter<boolean> = new EventEmitter();

  quotes: any;
  randomQuote: any = {
    text: '',
    author: ''
  };

  constructor(private quotesService: QuotesService) { }

  ngOnInit() {
    this.getQuote();
  }

  getQuote() {
    this.quotesService.getQuote().subscribe((data: any) => {this.quotes = data;
    this.randomQuote = this.quotes[Math.floor(Math.random() * this.quotes.length)];
    });
  }

  onChangeQuote() {
    this.getQuote();
  }

}
