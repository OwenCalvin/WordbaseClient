import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { WordbaseProvider } from '../../providers/wordbase/wordbase';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  Words: any;
  test: string;
  constructor(public navCtrl: NavController, private wordbaseProvider: WordbaseProvider) {
    wordbaseProvider.getWords().subscribe(data => {
      this.Words = data;
      console.log(this.Words);
    });
  }
}
