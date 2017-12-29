import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ToolboxProvider } from '../../providers/toolbox/toolbox';
import { WordbaseProvider } from '../../providers/wordbase/wordbase';

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})

export class RegisterPage {
  RegisterInfos = {
    username: '',
    email: '',
    password: '',
    confirm: ''
  };

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public wordbaseProvider: WordbaseProvider,
    public toolboxProvider: ToolboxProvider
  ) {}

  register() {
    this.wordbaseProvider.register(this.RegisterInfos).subscribe((data: any) => {
      data = JSON.parse(data);
      if(data.code == 'success') {
        this.toolboxProvider.presentToast('You are registered');
      } else {
        this.toolboxProvider.formatPresentToast(data);
      }
    });
  }
}
