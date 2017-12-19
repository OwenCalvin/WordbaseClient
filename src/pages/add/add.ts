import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { WordbaseProvider } from '../../providers/wordbase/wordbase';
import { ToolboxProvider } from '../../providers/toolbox/toolbox';
import { Content } from 'ionic-angular/components/content/content';

@IonicPage()
@Component({
  selector: 'page-add',
  templateUrl: 'add.html',
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
