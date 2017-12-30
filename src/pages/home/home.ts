import { Component, ViewChild, transition } from '@angular/core';
import { NavController } from 'ionic-angular';
import { WordbaseProvider } from '../../providers/wordbase/wordbase';
import { ToolboxProvider } from '../../providers/toolbox/toolbox';
import { AddPage } from '../../pages/add/add';
import { Content } from 'ionic-angular/components/content/content';
import { LoginPage } from '../login/login';
import { MessageComponent } from '../../components/message/message';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  @ViewChild(Content) Content: Content;
  @ViewChild(MessageComponent) message: MessageComponent;

  PushPage = AddPage;
  Words: any[];
  WordsFavs: any[];
  messageDisplayed = false;

  constructor(
    public navCtrl: NavController, 
    public wordbaseProvider: WordbaseProvider, 
    public toolboxProvider: ToolboxProvider
  ) {}

  ionViewDidEnter() {
    this.updateWords();
  }

  updateWords(callback = () => {}) {
    this.Words = [];
    this.WordsFavs = [];
    this.wordbaseProvider.getWords().subscribe((data: any[]) => {
      this.Words = data.filter(a => !a.fav);
      this.WordsFavs = data.filter(a => a.fav);
      return callback();
    });
  }

  switchList(item) {
    if(item.fav) {
      this.WordsFavs.push(item);
    } else {
      this.Words.push(item);
    }
  }

  disconnect() {
    this.wordbaseProvider.disconnect(() => {
      this.navCtrl.setRoot(LoginPage);
    });
  }

  top() {
    this.Content.scrollToTop(200);
  }

  refresh(refresher) {
    this.updateWords(() => {
      refresher.complete();
    });
  }

  copy() {
    this.message.display(1000);
  }
}
