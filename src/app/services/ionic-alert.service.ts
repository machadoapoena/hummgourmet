import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { AlertOptions } from '@ionic/core';

@Injectable({
  providedIn: 'root'
})
export class IonicAlertService {

  private alert:any;

  constructor(public alertCtrl: AlertController) { }

  create(opts?: AlertOptions) {
    this.alert = this.alertCtrl.create(opts).then((alertData) => {
      alertData.present();
    });
  }
}
