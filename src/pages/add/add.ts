import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-add',
  templateUrl: 'add.html',
})
export class AddPage {
  items = {
    title: String,
    datas: new Array()
  };
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.add();
  }

  add() {
      this.items.datas.push({
        name: '',
        value: ''
      });
  }

  inspect() {
    console.log(this.items);
  }
}
