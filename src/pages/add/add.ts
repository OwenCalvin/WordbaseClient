import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { WordbaseProvider } from '../../providers/wordbase/wordbase';
import { ToolboxProvider } from '../../providers/toolbox/toolbox';
import { Content } from 'ionic-angular/components/content/content';
import { trigger, state, style, animate, transition } from '@angular/animations';

@IonicPage()
@Component({
  selector: 'page-add',
  templateUrl: 'add.html',
  animations: [
    trigger('splice', [
      transition(':enter', [
        style({ height: 0 }),
        animate('.2s')
      ]),
      transition(':leave', [
        animate('.2s', style({ height: 0 }))
      ]),
    ])
  ]
})

export class AddPage {
  @ViewChild(Content) Content: Content;

  Item = {
    title: '',
    color: '#fefefe',
    datas: new Array({
      name: '',
      value: ''
    })
  };

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public wordbaseProvider: WordbaseProvider, 
    public toolboxProvider: ToolboxProvider
  ) {}

  delete(index) {
    this.toolboxProvider.removeFromArray(this.Item.datas, index);
  }

  add() {
    if(this.Item.datas.length <= 100) {
      this.Item.datas.push({
        name: '',
        value: ''
      });
      this.Content.scrollToBottom(100);
    }
  }

  send() {
    this.wordbaseProvider.insertWord(this.Item).subscribe(data => {
      this.toolboxProvider.presentToast('Word was added successfully');
    });
  }

  inspect() {
    console.log(this.Item.datas);
  }
}
