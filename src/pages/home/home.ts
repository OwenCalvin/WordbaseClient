import { Component, ViewChild } from '@angular/core';
import { NavController, ItemSliding } from 'ionic-angular';
import { WordbaseProvider } from '../../providers/wordbase/wordbase';
import { ToolboxProvider } from '../../providers/toolbox/toolbox';
import { AddPage } from '../../pages/add/add';
import { Content } from 'ionic-angular/components/content/content';
import { trigger, style, transition, animate, keyframes, query, stagger } from '@angular/animations';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
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

export class HomePage {
  @ViewChild(Content) Content: Content;
  PushPage = AddPage;
  Words: any[];
  
  constructor(
    public navCtrl: NavController, 
    public wordbaseProvider: WordbaseProvider, 
    public toolboxProvider: ToolboxProvider
  ) {
  }

  remove(index, slidingItem: ItemSliding) {
    this.wordbaseProvider.deleteWord(this.Words[index]).subscribe(data => {
      this.toolboxProvider.removeFromArray(this.Words, index);
    });
  }

  ionViewDidEnter() {
    this.updateWords();
  }

  disconnect() {
    this.wordbaseProvider.disconnect(() => {
      this.navCtrl.setRoot(LoginPage);
    });
  }

  updateWords() {
    this.wordbaseProvider.getWords().subscribe((data: any[]) => {
      this.Words = data;
    });
  }

  top() {
    this.Content.scrollToTop(200);
  }
}
