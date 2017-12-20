import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { WordbaseProvider } from '../../providers/wordbase/wordbase';
import { ToolboxProvider } from '../../providers/toolbox/toolbox';
import { Content } from 'ionic-angular/components/content/content';
import { trigger, style, transition, animate, keyframes, query, stagger } from '@angular/animations';

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

  item = {
    title: '',
    color: '#fefefe',
    _userId: '5a377c0b4d91202b5ce40ef4',
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
    console.log(this.item.datas[index]);
    this.toolboxProvider.removeFromArray(this.item.datas, index);
  }

  add() {
    if(this.item.datas.length <= 100) {
      this.item.datas.push({
        name: '',
        value: ''
      });
      this.Content.scrollToBottom(100);
    }
  }

  send() {
    this.wordbaseProvider.insertWord(this.item).subscribe(data => {
      this.toolboxProvider.presentToast('Word was added successfully');
    });
  }

  inspect() {
    console.log(this.item.datas);
  }
}
