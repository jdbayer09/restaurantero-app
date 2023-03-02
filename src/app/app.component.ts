import { Component } from '@angular/core';

import { ScreenOrientation, OrientationType } from '@capawesome/capacitor-screen-orientation';
import { Platform } from '@ionic/angular';
import { StorageService } from './services/util/storage.service';
import { storageKeys } from '../environments/storage-keys';
const DARK_MODE_KEY = storageKeys.MODO_OSCURO;
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private plat: Platform, private str: StorageService) {
    if(this.plat.is('capacitor')) {
      ScreenOrientation.lock({type: OrientationType.PORTRAIT_PRIMARY});
    }
    this.str.get(DARK_MODE_KEY).then((resp: boolean) => {
      document.body.classList.toggle('dark', resp);
    });
  }
}
