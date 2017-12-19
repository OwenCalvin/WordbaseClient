import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { WordbaseProvider } from '../../providers/wordbase/wordbase';
import { AddPage } from '../../pages/add/add';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  PushPage = AddPage;
  Words: any[];
  constructor(public navCtrl: NavController, public wordbaseProvider: WordbaseProvider) {}

  remove(index) {
    console.log(this.Words[index]);
    this.wordbaseProvider.deleteWord(this.Words[index]).subscribe(data => {
      this.wordbaseProvider.removeFromArray(this.Words, index);
    });
  }

  ionViewDidEnter() {
    this.updateWords();
  }

  updateWords() {
    this.wordbaseProvider.getWords().subscribe((data: any[]) => {
      this.Words = data;
    });
  }
}
