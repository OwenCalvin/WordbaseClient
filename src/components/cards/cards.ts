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
    this.wordbaseProvider.favWord(item).subscribe(newItem => {
      item.fav = !item.fav;
      this.toolboxProvider.removeFromArray(this.cards, item);
      this.favChanged.emit(item);
    });
  }
  
  duplicate(item) {
    this.wordbaseProvider.insertWord({
      title: item.title,
      fav: item.fav,
      datas: item.datas
    }).subscribe(word => {
      this.cards.push(JSON.parse(word));
    });
  }

  titlePressStart(whatToEdit, item, data) {
    this.toolboxProvider.presentAlert(data, null, 
      [
        {
          text: 'Close'
        },
        {
          text: 'Copy',
          handler: () => {
            this.copyText(data);
          }
        },
        {
          text: 'Edit',
          handler: () => {
            this.toolboxProvider.presentAlert('Edit', data.name,
              [
                {
                  text: 'Close'
                },
                {
                  text: 'Save',
                  handler: values => {
                    this.wordbaseProvider.editWord(item._id, whatToEdit, values.title).subscribe(newItem => {
                      item.title = JSON.parse(newItem).title;
                    });
                  }
                }
              ],
              [
                {
                  name: 'title',
                  placeholder: data,
                  value: data
                }
              ]
            ); 
          }
        },
        {
          text: 'Add',
          handler: () => {
            this.toolboxProvider.presentAlert('Add', null, 
              [
                {
                  text: 'Close'
                },
                {
                  text: 'Save',
                  handler: values => {
                    this.wordbaseProvider.addData(item._id, values).subscribe((newItem: any) => {
                      item.datas = JSON.parse(newItem).datas;
                    });
                  }
                }
              ],
              [
                {
                  name: 'name',
                  placeholder: 'Name'
                },
                {
                  name: 'value',
                  placeholder: 'Value'
                }
              ]
            );
          }
        }
      ]
    );
  }

  dataPressStart(index, item, data) {
    let what = 'datas.' + index;
    this.toolboxProvider.presentAlert(data.name, data.value,
      [
        { text: 'Close' },
        {
          text: 'Copy',
          handler: () => {
            this.copyText(data.value);
          } 
        },
        {
          text: 'Edit',
          handler: () => {
            this.toolboxProvider.presentAlert('Edit', data.name, 
              [
                { text: 'Close' },
                {
                  text: 'Save',
                  handler: values => {
                    this.wordbaseProvider.editWord(item._id, what, {
                      name: values.name,
                      value: values.value
                    }).subscribe(newItem => {
                      item.datas = JSON.parse(newItem).datas;
                    });
                  }
                }
              ],
              [
                {
                  name: 'name',
                  placeholder: data.name,
                  value: data.name
                },
                {
                  name: 'value',
                  placeholder: data.value,
                  value: data.value,
                }
              ]
            );
          }
        },
        {
          text: 'Delete',
          handler: () => {
            this.wordbaseProvider.spliceData(item._id, data._id).subscribe(newItem => {
              item.datas = JSON.parse(newItem).datas;
            });
          }
        }
      ],
    );
  }

  copyText(text) {
    this.clipboard.copy(text);
    this.copy.emit();
  }
}
