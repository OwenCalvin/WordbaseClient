import { Injectable } from '@angular/core';
import { AlertController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';

@Injectable()
export class ToolboxProvider {
  CurrentAlert = null;

  constructor(
    public toastCtrl: ToastController,
    public alertCtrl: AlertController, 
  ) {}
  
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
  
    toast.onDidDismiss(() => {});
  
    toast.present();
  }

  presentAlert(title, subTitle = null, buttons = ['Ok']) {
    this.CurrentAlert = this.alertCtrl.create({
      title: title,
      subTitle: subTitle,
      buttons: buttons
    });
    this.CurrentAlert.present();
  }

  closeAlert() {
    if(this.CurrentAlert) {
      this.CurrentAlert.dismiss();
      this.CurrentAlert = null;
    }
  }
}
