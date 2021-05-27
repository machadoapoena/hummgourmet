import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class IonicToastService {

  private myToast: any;

  constructor(public toast: ToastController) { }

  showToast(message:string) {
    this.myToast = this.toast.create({
      message: message,
      duration: 2000
    }).then((toastData) => {
      toastData.present();
    });
  }

  showToastWithConfig(config:any) {
    this.myToast = this.toast.create(config).then((toastData) => {
      toastData.present();
    });
  }

  hideToast() {
    this.myToast = this.toast.dismiss();
  }
}
