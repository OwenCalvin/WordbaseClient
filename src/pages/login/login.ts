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
    Log: String,
    Password: String
  }

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public wordbaseProvider: WordbaseProvider,
    public toolboxProvider: ToolboxProvider
  ) {}

  login() {
    this.wordbaseProvider.login(this.LogInfos).subscribe(data => {
      this.navCtrl.setRoot(HomePage);
      this.toolboxProvider.presentToast('You are logged');
    });
  }
}
