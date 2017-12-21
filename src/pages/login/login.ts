import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../../pages/home/home';
import { ToolboxProvider } from '../../providers/toolbox/toolbox';
import { WordbaseProvider } from '../../providers/wordbase/wordbase';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  LogInfos = {
    log: '',
    password: ''
  }

  RegisterInfos = {
    username: '',
    email: '',
    password: ''
  }

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public wordbaseProvider: WordbaseProvider,
    public toolboxProvider: ToolboxProvider
  ) {}

  login() {
    this.wordbaseProvider.login(this.LogInfos).subscribe((data: Object) => {
      if(data) {
        this.navCtrl.setRoot(HomePage);
        this.toolboxProvider.presentToast('You are logged');
        this.wordbaseProvider.User = data;
      } else {
        this.toolboxProvider.presentToast('Retry please');
      }
    });
  }

  register() {
    this.wordbaseProvider.register(this.RegisterInfos).subscribe(data => {
      this.toolboxProvider.presentToast('You are registered');
    });
  }
}
