import { Component } from '@angular/core';

import { ScreenOrientation, OrientationType } from '@capawesome/capacitor-screen-orientation';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private plat: Platform) {
    if(this.plat.is('capacitor')) {
      ScreenOrientation.lock({type: OrientationType.PORTRAIT_PRIMARY});
    }    
  }
}
