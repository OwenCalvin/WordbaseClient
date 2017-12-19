import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { WordbaseProvider } from '../../providers/wordbase/wordbase';
import { ToolboxProvider } from '../../providers/toolbox/toolbox';
import { AddPage } from '../../pages/add/add';
import { trigger, style, transition, animate, keyframes, query, stagger } from '@angular/animations';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  animations: [
    trigger('splice', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('.3s', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        style({ opacity: 1 }),
        animate('.3s', style({ opacity: 0 }))
      ]),
    ])
  ]
})
export class HomePage {
  PushPage = AddPage;
  Words: any[];
  
  constructor(
    public navCtrl: NavController, 
    public wordbaseProvider: WordbaseProvider, 
    public toolboxProvider: ToolboxProvider
  ) {}

  remove(index) {
    this.wordbaseProvider.deleteWord(this.Words[index]).subscribe(data => {
      this.toolboxProvider.removeFromArray(this.Words, index);
      this.toolboxProvider.presentToast('Word was removed successfully');
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
