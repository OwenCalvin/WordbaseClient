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
  @Output() edit = new EventEmitter();

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
  
  titlePressStart(whatToEdit, item, data) {
    this.cardAlert(data, data, data, 
      {
        buttons: [
          {
            text: 'Close'
          },
          {
            text: 'Save',
            handler: values => {
              this.wordbaseProvider.editWord(item._id, whatToEdit, values.title).subscribe(res => {
                item.title = values.title;
              });
            }
          }
        ],
        inputs: [
          {
            name: 'title',
            placeholder: data
          }
        ]
      }
    );
  }

  dataPressStart(index, item, data) {
    let whatToEdit = 'datas.' + index;
    this.cardAlert(data.name, data.value, data.value,
      {
        buttons: [
          {
            text: 'Close'
          },
          {
            text: 'Save',
            handler: values => {
              this.wordbaseProvider.editWord(item._id, whatToEdit, {
                name: values.name,
                value: values.value
              }).subscribe(res => {
                item.datas[index] = values;
              });
            }
          }
        ],
        inputs: [
          {
            name: 'name',
            placeholder: data.name
          },
          {
            name: 'value',
            placeholder: data.value,
          }
        ]
      }
    );
  }

  cardAlert(title, subTitle, copy, controls) {
    this.toolboxProvider.presentAlert(title, subTitle,
      [
        { text: 'Close' },
        {
          text: 'Edit',
          handler: () => {
            this.toolboxProvider.presentAlert('Edit', subTitle, controls.buttons, controls.inputs);
          }
        },
        {
          text: 'Copy',
          handler: () => {
            this.clipboard.copy(copy);
            this.copy.emit();
          } 
      }]
    );
  }
}
