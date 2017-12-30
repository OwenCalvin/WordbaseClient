import { Component, Input } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'message',
  templateUrl: 'message.html',
  animations: [
    trigger('display', [
      state('active', style({
        bottom: '10px'})),
      state('inactive', style({
      })),
      transition('* => *', animate('.2s ease')),
    ])
  ]
})

export class MessageComponent {
  @Input('text') Content: String;
  Displayed: Boolean = false;

  constructor() {}

  get DisplayStatus() {
    return this.Displayed ? 'active' : 'incative';
  }

  display(Time) {
    console.log('test');
    this.Displayed = true;
    setTimeout(() => {
      this.Displayed = false;
    }, Time);
  }
  
}
