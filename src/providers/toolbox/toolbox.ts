import { Injectable } from '@angular/core';
import { AlertController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { Alert } from 'ionic-angular/components/alert/alert';

@Injectable()
export class ToolboxProvider {
  CurrentAlert: Alert = null;

  constructor(
    public toastCtrl: ToastController,
    public alertCtrl: AlertController, 
  ) {}

  get AlertDisplayed() {
    return Boolean(this.CurrentAlert);
  }
  
  removeFromArray(array: any[], item) {
    array.splice(array.indexOf(item), 1);
  }

  formatPresentToast(data) {
    this.presentToast(data.code + ': ' + data.what + ' ' + data.why);
  }

  presentToast(message, duration = 1000, position = 'top') {
    let toast = this.toastCtrl.create({
      message: message,
      duration: duration,
      position: position
    });
    toast.present();
  }

  presentAlert(title, subTitle = null, buttons: any[] = ['Ok'], inputs: any[] = null) {
    this.CurrentAlert = this.alertCtrl.create({
      title: title,
      subTitle: subTitle,
      buttons: buttons,
      inputs: inputs
    });
    this.CurrentAlert.present();
  }
}
