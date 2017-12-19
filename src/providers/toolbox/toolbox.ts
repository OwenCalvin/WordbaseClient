import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastController } from 'ionic-angular';

@Injectable()
export class ToolboxProvider {
  constructor(
    public toastCtrl: ToastController
  ) {}
  
  removeFromArray(array: any[], index) {
    array.splice(index, 1);
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
}
