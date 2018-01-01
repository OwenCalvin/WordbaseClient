import { Component, Input } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'message',
  templateUrl: 'message.html',
  animations: [
    trigger('display', [
      state('active', style({
        transform: 'translateX(-50%)',
        left: '50%'
      })),
      state('inactive', style({
      })),
      transition('* => *', animate('.3s ease')),
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
    this.Displayed = true;
    setTimeout(() => {
      this.Displayed = false;
    }, Time);
  }
  
  close() {
    this.Displayed = false;
  }
}
