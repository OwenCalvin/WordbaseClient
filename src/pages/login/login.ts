import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../../pages/home/home';
import { RegisterPage } from '../../pages/register/register';
import { ToolboxProvider } from '../../providers/toolbox/toolbox';
import { WordbaseProvider } from '../../providers/wordbase/wordbase';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  PushPage = RegisterPage;

  LogInfos = {
    log: '',
    password: ''
  };

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public wordbaseProvider: WordbaseProvider,
    public toolboxProvider: ToolboxProvider,
  ) {}

  login() {
    this.wordbaseProvider.login(this.LogInfos).subscribe((data: any) => {
      data = JSON.parse(data);
      if(data.code == 'success') {
        this.navCtrl.setRoot(HomePage);
        this.wordbaseProvider.User = data.data;
      } else {
        this.toolboxProvider.formatPresentToast(data);
      }
    });
  }
}
