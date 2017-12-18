import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { WordbaseProvider } from '../../providers/wordbase/wordbase';
import { AddPage } from '../../pages/add/add';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  PushPage: any;
  Words: any;
  constructor(public navCtrl: NavController, private wordbaseProvider: WordbaseProvider) {
    this.PushPage = AddPage;
    wordbaseProvider.getWords().subscribe(data => {
      this.Words = data;
    });
  }
}
