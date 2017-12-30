import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ItemSliding } from 'ionic-angular';
import { trigger, style, animate, transition } from '@angular/animations';
import { WordbaseProvider } from '../../providers/wordbase/wordbase';
import { ToolboxProvider } from '../../providers/toolbox/toolbox';
import { Clipboard } from '@ionic-native/clipboard';
import { GesturesDirective } from '../../directives/gestures/gestures';

@Component({
  selector: 'cards',
  templateUrl: 'cards.html',
  animations: [
    trigger('splice', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('.2s')
      ]),
      transition(':leave', [
        animate('.2s', style({ opacity: 0 }))
      ]),
    ])
  ]
})

export class CardsComponent {
  @Input('cards') cards;
  @Output() favChanged = new EventEmitter();
  @Output() copy = new EventEmitter();
  popupActive = false;

  constructor(
    public wordbaseProvider: WordbaseProvider,
    public toolboxProvider: ToolboxProvider,
    public clipboard: Clipboard
  ) {}

  remove(item) {
    this.wordbaseProvider.deleteWord(item).subscribe(data => {
      this.toolboxProvider.removeFromArray(this.cards, item);
    });
  }

  fav(item) {
    this.wordbaseProvider.favWord(item).subscribe(data => {
      item.fav = !item.fav;
      this.toolboxProvider.removeFromArray(this.cards, item);
      this.favChanged.emit(item);
    });
  }

  pressStart(data) {
    this.toolboxProvider.presentAlert(data.name, data.value,
      [
        { text: 'Close' },
        {
          text: 'Copy',
          handler: () => {
            this.clipboard.copy(data.value);
            this.copy.emit();
          } 
      }]
    );
  }
}
