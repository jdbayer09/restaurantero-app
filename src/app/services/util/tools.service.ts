import { Injectable } from '@angular/core';
import { AlertController, LoadingController, NavController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToolsService {

  constructor(
    public loadingCtrl: LoadingController,
    public navCtrl: NavController,
    public alertCtrl: AlertController
  ) { }


  async getLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Cargando...',
      animated: true,
      spinner: 'bubbles',
      cssClass: 'loadingCss'
    });
    loading.present();
    return loading;
  }

  async presentAlert(tittle: string, msg: string) {
    const alert = this.alertCtrl.create({
      message: msg,
      header: tittle,
      mode: 'ios',
      buttons: ['Aceptar']
    });
    alert.then(alerts => alerts.present());
  }
}
